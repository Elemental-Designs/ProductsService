require('dotenv').config();
const { Pool, Client } = require('pg');

// deployed connection
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

// local connection
// const pool = new Pool({
//   user: 'jessicachen',
//   password: 'psql',
//   host: 'localhost',
//   database: 'atelier'
// });

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