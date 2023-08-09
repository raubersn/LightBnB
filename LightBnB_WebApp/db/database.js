//importing 
const {query} = require('../db/index');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return query(`SELECT * 
      FROM users 
      WHERE lower(email) = $1`,
      [email.toLowerCase()],
      //Needs to be refactor to deal with multiple useres with the same e-mail (benjaminfletcher@outlook.com)
      //This function will return the first user found, which may be wrong
      (result) => {return result.rows[0] || null;});
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return query(`SELECT * 
      FROM users 
      WHERE id = $1`,
      [id],
      (result) => {return result.rows[0] || null;});
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return query(`INSERT INTO users (name, email, password)
      VALUES($1, $2, $3)
      RETURNING *;`,
    [user.name, user.email, user.password],
    (result) => {return result.rows[0];});
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return query(`SELECT properties.*, start_date, end_date, AVG(rating) AS average_rating
      FROM properties
      JOIN reservations ON properties.id = reservations.property_id
      LEFT JOIN property_reviews ON reservations.id = property_reviews.reservation_id AND reservations.property_id = property_reviews.property_id AND reservations.guest_id = property_reviews.guest_id
      WHERE reservations.guest_id = $1
      GROUP BY reservations.id, properties.id
      ORDER BY start_date
      LIMIT $2;`,
    [guest_id, limit],
    (result) => {return result.rows;});    
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, AVG(rating) AS average_rating
    FROM properties 
    LEFT JOIN property_reviews ON properties.id = property_reviews.property_id `;
  let conditions = '';

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    conditions = `WHERE owner_id = $${queryParams.length} `;
  }
  if (options.city) {
    queryParams.push(`%${options.city.toLowerCase()}%`);
    conditions += `${conditions ? 'AND' : 'WHERE'} lower(city) LIKE $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    conditions += `${conditions ? 'AND' : 'WHERE'} cost_per_night >= $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    conditions += `${conditions ? 'AND' : 'WHERE'} cost_per_night <= $${queryParams.length} `;
  }

  queryString += conditions + `GROUP BY properties.id `;

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING AVG(rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};`;
  return query(queryString, queryParams, (result) => {return result.rows;});
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  return query(`INSERT INTO properties (owner_id, 
                                        title, 
                                        description, 
                                        thumbnail_photo_url, 
                                        cover_photo_url, 
                                        cost_per_night, 
                                        street, 
                                        city, 
                                        province, 
                                        post_code, 
                                        country, 
                                        parking_spaces, 
                                        number_of_bathrooms, 
                                        number_of_bedrooms)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
              RETURNING *;`,
    [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms],
    (result) => {return result.rows[0];});
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
