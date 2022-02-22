const Router = require('@koa/router');
const expenseService = require("../services/expenseService")
const Joi = require("joi")
const validate = require("./_validation")

const getAllExpenses = async (ctx) => {
    ctx.body = await expenseService.getAllExpenses();
}

const getExpenseById = async (ctx) => {
    ctx.body = await expenseService.getExpenseById(ctx.params.expense_id);
}
getExpenseById.schema = {
    params: {
        expense_id: Joi.string()
    }
}

const getAllExpensesForEvent = async (ctx) => {
    ctx.body = await expenseService.getAllExpensesByEvent(ctx.params.event_id);
}
getAllExpensesForEvent.schema = {
    params: {
        event_id: Joi.string()
    }
}

module.exports = (app) => {
    console.log("expense router is being created")
    const router = new Router({
        prefix: '/expenses',
    });

    router.get('/', getAllExpenses);
    router.get("/:expense_id", validate(getExpenseById.schema), getExpenseById())
    router.get(
        "/byEvent/:event_id",
        validate(getAllExpensesForEvent.schema),
        getAllExpensesForEvent
    );
    try {
        app.use(router.routes()).use(router.allowedMethods());
    } catch (e) {
        console.log(e)
    }
};