import Koa from 'koa';
import Router from 'koa-router';
import { getLoginUrl } from '../infrastructure/svix';


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
  let message;

  const importantEvents = [
      'endpoint.deleted',
      'endpoint.disabled',
      'endpoint.updated',
      'message.attempt.exhausted',
      'message.attempt.failing'
  ]

  if (importantEvents.includes(eventType)) {
    console.log(svixEvent);
    message = `Operational webhook of type ${eventType} received`
  } else {
    message = `Skipped processing operational webhook of type ${eventType}`;
  }

  ctx.body = {
    message
  };
});

export default router;
