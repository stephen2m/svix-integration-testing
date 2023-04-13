import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import bodyParser from 'koa-bodyparser';
const winston = require('winston');
const auth = require('koa-basic-auth');

import { responseTimeHeader } from '../middleware';
import svixController from '../controllers/svix.controller';
import  { logger } from '../infrastructure/logging';

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
app.use(responseTimeHeader);
app.use(auth({ name: process.env.SVIX_AUTH_USERNAME, pass: process.env.SVIX_AUTH_PASSWORD }));

app.use(svixController.routes());
app.use(svixController.allowedMethods());

// Application error logging.
app.on('error', console.error);

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default app;
