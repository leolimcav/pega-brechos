const { Pool } = require('pg');
const dbconfig = require('./config');

const pool = new Pool(dbconfig);

module.exports = pool;
