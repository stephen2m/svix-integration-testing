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

export default router;
