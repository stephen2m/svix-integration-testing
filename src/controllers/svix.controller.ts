import axios from 'axios';
import Koa from 'koa';
import Router from 'koa-router';

import { getEndpointDetails, getLoginUrl } from '../infrastructure/svix';
import  { logger } from '../infrastructure/logging';
import { OperationalWebhookEvent } from '../interfaces';
import { getSettings } from '../settings';

const settings = getSettings();

const routerOpts: Router.IRouterOptions = {
  prefix: '/svix',
};

const router: Router = new Router(routerOpts);

router.post('/clients/login', async (ctx:Koa.Context) => {
    // @ts-ignore
  const { clientId } = ctx.request.body;
  const { url } = await getLoginUrl(clientId);

  ctx.body = { url };
});

router.post('/events', async (ctx:Koa.Context) => {
  // @ts-ignore
  const eventType = ctx.request.body.type as string;
  const svixEvent = ctx.request.body as OperationalWebhookEvent;

  const importantEvents = [
      'endpoint.deleted',
      'endpoint.disabled',
      'endpoint.updated',
      'message.attempt.exhausted',
      'message.attempt.failing'
  ];

  if (importantEvents.includes(svixEvent.type)) {
    logger.info('Received operational webhook', { svixEvent });

    const endpoint = await getEndpointDetails(svixEvent.data.appUid, svixEvent.data.endpointId);
    const metric = {
      type: eventType,
      clientId: svixEvent.data.appUid,
      endpoint,
    }
    logger.info('Outgoing details in operational webhook event', { metric });

    if (settings.metricsEndpoint != null) {
      await axios.post(settings.metricsEndpoint, metric);
    } else {
      logger.error('Skipped metric reporting.  Missing environment variable METRICS_ENDPOINT')
    }
  } else {
    logger.warn(`Skipped processing operational webhook of type ${eventType}`);
  }

  ctx.body = {
    message: 'Operational webhook received'
  };
});

router.get('/clients/endpoints', async (ctx:Koa.Context) => {
    const { clientId, filterType } = ctx.request.query;
    ctx.body = await listEndpoints(clientId, filterType);
})

export default router;
