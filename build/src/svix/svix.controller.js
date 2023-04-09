"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const svix_1 = require("../infrastructure/svix");
const routerOpts = {
    prefix: '/svix',
};
const router = new koa_router_1.default(routerOpts);
router.post('/clients/login', async (ctx) => {
    // @ts-ignore
    const { clientId } = ctx.request.body;
    const { url } = await svix_1.getLoginUrl(clientId);
    ctx.body = { url };
});
exports.default = router;
