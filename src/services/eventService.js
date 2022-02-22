const uuid = require("uuid");
const {tables, getKnex} = require("../data/index")

const getAllEvents = async () => {
    return getKnex()(tables.event).select();
}

const getEventByID = async (search_id) => {
    return getKnex()(tables.event)
        .select()
        .where("event_id", search_id)
}

const getEventsByName = async (search_name) => {
    return getKnex()(tables.event)
        .select()
        .where("name", search_name)
}

module.exports = {
    getAllEvents,
    getEventByID,
    getEventsByName
}