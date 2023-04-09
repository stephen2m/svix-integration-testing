// @ts-ignore
export async function responseTimeHeader (ctx, next) {
    const started = Date.now();
    await next();
    const elapsed = (Date.now() - started) + 'ms';
    ctx.set('X-ResponseTime', elapsed);
}