import Koa from 'koa';
import Router from 'koa-router';
import { getLoginUrl } from '../infrastructure/svix';
import  { logger } from '../infrastructure/logging';

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
  const svixEvent = ctx.request.body;
  // @ts-ignore
  const eventType = svixEvent.type;

  const importantEvents = [
      'endpoint.deleted',
      'endpoint.disabled',
      'endpoint.updated',
      'message.attempt.exhausted',
      'message.attempt.failing'
  ]

  if (importantEvents.includes(eventType)) {
    logger.info('Received operational webhook', { svixEvent });
  } else {
    logger.warn(`Skipped processing operational webhook of type ${eventType}`);
  }

  ctx.body = {
    message: 'Operational webhook received'
  };
});

export default router;
