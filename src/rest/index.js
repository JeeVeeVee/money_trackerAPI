const Router = require('@koa/router');

const installUserRouter = require('./_users')
const installEventRouter = require("./_events")
const installOverviewRouter = require('./_overview')

module.exports = async (app) => {
    const router = new Router({
        prefix: '/api',
    });
    installUserRouter(router)
    installEventRouter(router)
    installOverviewRouter(router);
    app.use(router.routes()).use(router.allowedMethods());
};