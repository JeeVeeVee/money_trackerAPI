const {tables} = require("../index");
module.exports = {
    up: async (knex) => {
        console.info("initiating user table")
        await knex.schema.createTableIfNotExists(tables.user, (table) => {
            table.uuid('user_id')
                .primary();
            table.string('name')
                .notNullable();
            table.integer('role')
                .notNullable();

        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.user);
    },
};