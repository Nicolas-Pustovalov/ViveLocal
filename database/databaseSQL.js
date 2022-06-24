
const {Pool} = require('pg');
const config = {
    connectionString: process.env.DATABASE_URL
}


if (process.env.NODE_ENV === 'production') {
    //I'm on the heroku environment, I'm adapting my config
    config.ssl = {
        rejectUnauthorized: false
    };
}


const pool = new Pool(config);

module.exports = pool;