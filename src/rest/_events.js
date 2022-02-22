const Router = require('@koa/router');
const eventService = require("../services/eventService")
const Joi = require("joi")
const validate  = require("./_validation")


const getAllEvents = async (ctx) => {
    console.log("all events are fetched")
    ctx.body = await eventService.getAllEvents();
}

const getEventByID = async (ctx) => {
    console.log("snack with id " + ctx.params.user_id + "is fetched");
    ctx.body = await eventService.getEventByID(ctx.params.event_id)
}
getEventByID.schema = {
    params : {
        event_id: Joi.string()
    }
}

module.exports = (app) => {
    console.log("user router is being created")
    const router = new Router({
        prefix: '/events',
    });

    router.get('/', getAllEvents);
    router.get("/:event_id",  getEventByID)
    try{
        app.use(router.routes()).use(router.allowedMethods());
    } catch (e) {
        console.log(e)
    }
};