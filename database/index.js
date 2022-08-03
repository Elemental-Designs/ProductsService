const { Pool, Client } = require('pg');

const client = new Client({
  user: 'jessicachen',
  password: 'psql',
  host: process.env.DB_HOST,
  database: 'atelier',
});

client.connect();
module.exports = (text, values) => client.query(text, values);