module.exports = {
    properties : {
        port : 9000,
    },

    database_options : {
        client: 'sqlite3',
        connection: {
            filename: "money_tracker.sqlite"
        },
    }
};