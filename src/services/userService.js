const uuid = require("uuid");
const {tables, getKnex} = require("../data/index")

const getAllUsers = async () => {
    return getKnex()(tables.user).select();
}

const getUserById = async (search_id) => {
    return getKnex()(tables.user)
        .select()
        .where("user_id", search_id)
}

const getUsersByName = async (search_name) => {
    return getKnex()(tables.user)
        .select()
        .where("name", search_name)
}

module.exports = {
    getUsersByName, getAllUsers, getUserById
}