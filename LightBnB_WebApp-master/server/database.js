/* eslint-disable camelcase */
const pool = require("./connection");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `SELECT * FROM users WHERE email = $1;`;
  const values = [email];

  return pool
    .query(queryString, values)
    .then(result => {
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      return null;
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];

  return pool
    .query(queryString, values)
    .then(result => {
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      return null;
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [user.name, user.email, user.password];

  return pool
    .query(queryString, values)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
    SELECT reservations.*, properties.*, AVG(rating) as average_rating
    FROM properties
    JOIN reservations ON properties.id = reservations.property_id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY reservations.id, properties.id
    ORDER BY start_date DESC
    LIMIT $2;`;
  const values = [guest_id, limit];

  return pool
    .query(queryString, values)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    WHERE TRUE`;
  const values = [];

  if (options.city) {
    values.push(`%${options.city}%`);
    queryString += ` AND city LIKE $${values.length}`;
  }
  if (options.owner_id) {
    values.push(`${options.owner_id}`);
    queryString += ` AND owner_id = $${values.length}`;
  }
  if (options.minimum_price_per_night) {
    values.push(`${options.minimum_price_per_night * 100}`);
    queryString += ` AND cost_per_night >= $${values.length}`;
  }
  if (options.maximum_price_per_night) {
    values.push(`${options.maximum_price_per_night * 100}`);
    queryString += ` AND cost_per_night <= $${values.length}`;
  }

  queryString += ` GROUP BY properties.id`;

  if (options.minimum_rating) {
    values.push(`${options.minimum_rating}`);
    queryString += ` HAVING AVG(property_reviews.rating) >= $${values.length}`;
  }
  
  values.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${values.length}`;

  return pool
    .query(queryString, values)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryParams = [];
  const queryValues = [];
  const values = [];

  const propertyProps = [
    "owner_id",
    "title",
    "description",
    "thumbnail_photo_url",
    "cover_photo_url",
    "cost_per_night",
    "street",
    "city",
    "province",
    "post_code",
    "country",
    "parking_spaces",
    "number_of_bathrooms",
    "number_of_bedrooms"
  ];
  
  for (const prop in property) {
    if (propertyProps.includes(prop)) {
      queryParams.push(prop);
      queryValues.push(`${property[prop]}`);
      values.push(`$${queryParams.length}`);
    }
  }

  const joinedQueryParams = queryParams.join(', ');
  const joinedValues = values.join(', ');

  const queryString = `
    INSERT INTO properties (${joinedQueryParams})
    VALUES (${joinedValues});`;

  return pool
    .query(queryString, queryValues)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });

};
exports.addProperty = addProperty;
