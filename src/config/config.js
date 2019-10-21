const {
  PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT,
} = require('dotenv').config();

module.exports = {
  host: PGHOST,
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: PGPORT,
};
