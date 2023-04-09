"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const svix_controller_1 = __importDefault(require("../svix/svix.controller"));
const app = new koa_1.default();
app.use(koa_bodyparser_1.default());
// Generic error handling middleware.
app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (error) {
        ctx.status = error.statusCode || error.status || http_status_codes_1.default.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = { error };
        ctx.app.emit('error', error, ctx);
    }
});
app.use(svix_controller_1.default.routes());
app.use(svix_controller_1.default.allowedMethods());
// Application error logging.
app.on('error', console.error);
exports.default = app;
