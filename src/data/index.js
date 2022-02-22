const knex = require('knex')
const {join} = require('path');

let knexInstance;

async function initializeData() {
    const knexOptions = {
        client: 'sqlite3',
        connection: {
            filename: "money_tracker.sqlite"
        },
        migrations: {
            tableName: 'knex_meta',
            directory: "src/data/migrations"
        },
        seeds: {
            directory: "src/data/seeds",
        }
    };
    knexInstance = knex(knexOptions);

    try {
        //  let result = await knexInstance.raw('SELECT 1+1 AS result');
        //await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS money_tracker`);

        // We need to update the Knex configuration and reconnect to use the created database by default
        // USE ... would not work because a pool of connections is used
        await knexInstance.destroy();

        knexOptions.connection.database = "moneytracker";
        knexInstance = knex(knexOptions);
        //  await knexInstance.raw('SELECT 1+1 AS result');
    } catch (error) {
        console.error("something went wrong")
        console.log(error)
        throw new Error('Could not initialize the data layer');
    }


    let migrationsFailed = true;
    try {
        console.log("migrating")
        await knexInstance.migrate.latest()
        migrationsFailed = false;
    } catch (e) {
        console.log("migrations failed")
        console.error(e)
    }

    if (migrationsFailed) {

        try {
            await knexInstance.migrate.down();
        } catch (error) {
            console.error(error.message)
        }
        throw new Error('Migrations failed');
    }

    try {
        await knexInstance.seed.run();
        console.log("seeds succesfull")
    } catch (error) {
        console.log("seeds failed")
        console.error(error.message);
    }
    return knexInstance
}

async function shutdownData() {
    console.log('Shutting down database connection');

    await knexInstance.destroy();
    knexInstance = null;

    console.log('Database connection closed');
}

function getKnex() {
    if (!knexInstance) throw new Error('Please initialize the data layer before getting the Knex instance');
    return knexInstance;
}

const tables = {
    user: "users",
    event: "events",
    expense: "expenses"
};


module.exports = {
    tables,
    getKnex,
    initializeData,
    shutdownData,
};