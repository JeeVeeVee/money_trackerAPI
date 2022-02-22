const uuid = require("uuid");
const {tables, getKnex} = require("../data/index")

const getAllExpenses = async () => {
    return getKnex()(tables.expense).select();
}

const getExpenseByID = async (search_id) => {
    return getKnex()(tables.expense)
        .select()
        .where("expense_id", search_id)
}

const getExpensesByEvent = async (search_event) => {
    return getKnex()(tables.expense)
        .select()
        .where("event", search_event)
}

module.exports = {
    getAllExpenses,
    getExpenseByID,
    getExpensesByEvent
}