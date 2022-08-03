const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'jessicachen',
  password: 'psql',
  host: process.env.DB_HOST,
  database: 'atelier',
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