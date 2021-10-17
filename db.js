const Pool = require("pg").Pool;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1qaz!QAZ',
    database: 'userapp',
    port:5432
});

module.exports = pool;