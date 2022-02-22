const {tables} = require('..');

module.exports = {
    seed: async (knex) => {
        // first delete all entries
        await knex(tables.event).delete();
        console.info("fill event table")
        // then add the fresh users
        await knex(tables.event).insert([
            {
                event_id: '6820b760-93b0-11ec-b909-0242ac120002',
                name: 'quiz',
                year: '2021-2022',
                created_by: '7f28c5f9-d711-4cd6-ac15-d13d71abff83'
            },
            {
                event_id: '44a4c906-93b1-11ec-b909-0242ac120002',
                name: 'spaghetti',
                year: '2021-2022',
                created_by: '7f28c5f9-d711-4cd6-ac15-d13d71abff83'
            },
            {
                event_id: '495de504-93b1-11ec-b909-0242ac120002',
                name: 'ole danse',
                year: '2021-2022',
                created_by: '7f28c5f9-d711-4cd6-ac15-d13d71abff83'
            },
        ]);
    },
};