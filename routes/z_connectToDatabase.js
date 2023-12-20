const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const db = require('../services/db');
const helper = require('../helper');
const router = express.Router();
//const login = require('../services/login');
// For Joi
const Joi = require('joi');


// Define a custom validation error messages object
const customMessages = {
  'any.required': 'The {{#label}} field is required.',
  'string.empty': 'The {{#label}} field is required.',
};

// Define a Joi schema for request validation
const schema = Joi.object({
  db_server: Joi.string().required().messages(customMessages),
  db_port: Joi.string().required().messages(customMessages),
  db_username: Joi.string().required().messages(customMessages),
  db_password: Joi.string().required().messages(customMessages),
  //db_password: Joi.string().messages(customMessages),
  db_name: Joi.string().required().messages(customMessages),
  site_URL: Joi.string().required().messages(customMessages),
  root_directory: Joi.string().required().messages(customMessages),
  portal_api_url: Joi.string().required().messages(customMessages),
});


// router.post('/connectToDatabase', (req, res) => {
//   const { databaseType, host, user, password, databaseName } = req.body;

//   // Use the provided credentials to establish a connection to the database
//   // Based on the `databaseType`, you can use the appropriate database library
//   // Example: You can use `mysql2` for MySQL, `mongodb` for MongoDB, etc.
//   // Connect to the database and store the connection for future use
// });
router.post('/', async function (req, res, next) {
  try {

    // Validate the request body against the schema
    const { error, value } = schema.validate(req.body);
    // const { databaseType, host, user, password, databaseName } = req.body;

    if (error) {
      return res.status(400).json({ success: false, details: error.details });
    }

    const requestData = value; // Use the validated request data
    session.db_server = requestData.db_server;
    session.db_port = requestData.db_port;
    session.db_username = requestData.db_username;
    session.db_password = requestData.db_password;
    session.db_name = requestData.db_name;
    session.site_URL = requestData.site_URL;
    session.root_directory = requestData.root_directory;
    session.portal_api_url = requestData.portal_api_url;
    return res.status(200).json({ success: true, message: 'Database connection successfully established'});
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;


