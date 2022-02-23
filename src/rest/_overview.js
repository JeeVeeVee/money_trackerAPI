const Router = require('@koa/router');
const overviewService = require("../services/overViewService")
const Joi = require("joi")
const validate  = require("./_validation")

const getOverview = async (ctx) => {
  ctx.body = await overviewService.getOverview();
}

module.exports = (app) => {
    console.log("overview router is being created")
    const router = new Router({
        prefix: '/overview',
    });

    router.get('/', getOverview);
    try {
        app.use(router.routes()).use(router.allowedMethods());
    } catch (e) {
        console.log(e)
    }
};