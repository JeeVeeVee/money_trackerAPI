const Router = require('@koa/router');

const installUserRouter = require('./_users')

module.exports = async (app) => {
    const router = new Router({
        prefix: '/api',
    });
    installUserRouter(router)
    app.use(router.routes()).use(router.allowedMethods());
};