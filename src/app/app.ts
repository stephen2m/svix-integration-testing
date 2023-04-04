import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import bodyParser from 'koa-bodyparser';

import svixController from '../svix/svix.controller';

const app:Koa = new Koa();

app.use(bodyParser());

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
        await next();
    } catch (error) {
        ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = { error };
        ctx.app.emit('error', error, ctx);
    }
});

app.use(svixController.routes());
app.use(svixController.allowedMethods());

// Application error logging.
app.on('error', console.error);

export default app;