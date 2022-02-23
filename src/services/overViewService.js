const uuid = require("uuid");
const {tables, getKnex} = require("../data/index")


const getOverview = async () => {
    output = {}
    years = await getYears();
   for(const year of years){
        console.log(year.year)
        output[year.year] = await getEventsForYear(year.year)
        console.log(output)
    }
    return await output;
}

const getYears = async () => {
    return await getKnex()(tables.event).distinct("year");
}

const getEventsForYear = async (year) => {
    return await getKnex()(tables.event).select("event_id", "name")
        .where("year", year);
}

module.exports = {
    getOverview
}