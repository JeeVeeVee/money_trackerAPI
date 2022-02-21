const {tables} = require('..');

module.exports = {
    seed: async (knex) => {
        // first delete all entries
        await knex(tables.user).delete();
        console.info("fill usertable")
        // then add the fresh users
        await knex(tables.user).insert([
            {
                user_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff83',
                name: 'Jules Vervaeke',
                role: 0
            },
            {
                user_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff84',
                name: 'Emiel Mussche',
                role: 1
            },
            {
                user_id: '7f28c5f9-d711-4cd6-ac15-d13d71abff85',
                name: 'Emile Vervaeke',
                role: 2
            },
        ]);
    },
};