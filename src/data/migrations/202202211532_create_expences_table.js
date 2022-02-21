const {tables} = require("../index");
module.exports = {
    up: async (knex) => {
        console.info("initiating event table")
        await knex.schema.createTableIfNotExists(tables.event, (table) => {
            table.uuid('expense_id')
                .primary();
            table.string('description')
                .notNullable();
            table.boolean("expense")
                .notNullable();
            table.uuid('event')
                .notNullable();
            table.uuid('added_by')
                .notNullable();

            table.foreign("created_by", "fk_expenses_users")
                .references(`${tables.user}.user_id`)

            table.foreign("event", "fk_expenses_events")
                .references(`${tables.event}.event_id`)

        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.user);
    },
};