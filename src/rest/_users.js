const Router = require('@koa/router');
const userService = require("../services/userService")
const Joi = require("joi")
const validate  = require("./_validation")


const getAllUsers = async (ctx) => {
    console.log("all users are fetched")
    console.log(ctx)
    ctx.body = await userService.getAllUsers();

}

const getUserById = async (ctx) => {
    console.log("i get called?")
    console.log("snack with id " + ctx.params.user_id + "is fetched");
    ctx.body = await userService.getUserById(ctx.params.user_id)
}
getUserById.schema = {
    params : {
        user_id: Joi.string()
    }
}

module.exports = (app) => {
    console.log("user router is being created")
    const router = new Router({
        prefix: '/users',
    });

    router.get('/', getAllUsers);
    router.get("/:user_id", validate(getUserById.schema),  getUserById)
    try{
        app.use(router.routes()).use(router.allowedMethods());
    } catch (e) {
        console.log(e)
    }
};