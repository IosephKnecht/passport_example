const config = {};

config.redisStore = {
    host: process.env.REDIS_STORE_URI,
    port: 6379,
    secret: process.env.REDIS_STORE_SECRET
};

config.mssqlStore = {
    server: process.env.MSSQL_URL,
    options: {
        database: process.env.MSSQL_DATABASE_NAME,
        port: Number(process.env.MSSQL_PORT),
        rowCollectionOnRequestCompletion: true
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