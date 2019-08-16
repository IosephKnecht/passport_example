const config = {};

config.redisStore = {
    url: process.env.REDIS_STORE_URI,
    secret: process.env.REDIS_STORE_SECRET
};

config.mssqlStore = {
    server: process.env.MSSQL_URL,
    options: {
        database: process.env.MSSQL_DATABASE_NAME,
        port: process.env.MSSQL_PORT,
    },
    authentication: {
        type: process.env.MSSQL_AUTHENTICATION_TYPE,
        options: {
            userName: process.env.MSSQL_USERNAME,
            password: process.env.MSSQL_PASSWORD,
        }
    }
};

module.exports = config;