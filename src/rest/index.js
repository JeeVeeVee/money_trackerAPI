const Router = require('@koa/router');

const installUserRouter = require('./_users')
const installEventRouter = require("./_events")
module.exports = async (app) => {
    const router = new Router({
        prefix: '/api',
    });
    installUserRouter(router)
    installEventRouter(router)
    app.use(router.routes()).use(router.allowedMethods());
};