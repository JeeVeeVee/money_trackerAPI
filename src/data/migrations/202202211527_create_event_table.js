const {tables} = require("../index");
module.exports = {
    up: async (knex) => {
        console.info("initiating event table")
        await knex.schema.createTableIfNotExists(tables.event, (table) => {
            table.uuid('event_id')
                .primary();
            table.string('name')
                .notNullable();
            table.string('year')
                .notNullable();
            table.uuid('created_by')
                .notNullable();

            table.foreign("created_by", "fk_events_users")
                .references(`${tables.user}.user_id`)

        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.user);
    },
};