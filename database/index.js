require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

module.exports = (text, values) => {
  return pool.connect()
    .then((client) => {
      return client
        .query(text, values)
        .then((res) => {
          client.release();
          return res;
        })
        .catch((err) => {
          client.release();
          return new Error(err);
        })
    })
};