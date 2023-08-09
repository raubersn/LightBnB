const { Pool } = require('pg');
 
/// Database connection parameters
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

/**
 * Query the database.
 * @param {string} text The SQL query to be executed in the database.
 * @param {[]} params An array containing the values to be used as parameter in the SQL query.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const query = (text, params, callback) => {
  return pool
    .query(text, params)
    .then((result) => {
      return callback(result);
    })
    .catch((err) => {
      console.log(err.message);
    });

};

module.exports = {query};