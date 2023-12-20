const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config');
const helper = require('../helper');
var request = require('request');

// // For Joi
const Joi = require('joi');

// // Define a custom validation error messages object
const customMessages = {
  'number.base': 'Contact ID must be a number.',
  'number.integer': 'Contact ID must be an integer.',
  'number.positive': 'Contact ID must be an positive.',
  'number.min': 'Contact ID must be greater than or equal to 1.',
  'string.min': 'New password must be at least 6 characters long.',
  'any.required': 'The {{#label}} field is required.',
  'string.empty': 'The {{#label}} field is required.',
};

// // Define a Joi schema for request validation
const schema = Joi.object({
  module: Joi.string().required().messages(customMessages),
  username: Joi.string().required().messages(customMessages),
  userpassword: Joi.string().required().messages(customMessages),
});

router.post('/', async function (req, res, next) {
  try {

    const contactid = req.session.userId;
    
    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, details: error.details });
    }

    const requestData = value;
    ///const contactid = requestData.contactid;
    const moduleName = requestData.module;
    const username = requestData.username;
    const password = requestData.userpassword;

    // // Define the PHP API URL
    const customerPortalURL = config.portal_api_url;

    // Encode the username and password
    const credentials = `${username}:${password}`;

    // Base64 encode the credentials
    const token = Buffer.from(credentials).toString('base64');

    var options = {
      'method': 'POST',
      'url': customerPortalURL,
      headers: {
        'Authorization': `Basic ${token}`,
      },
      formData: {
        '_operation': 'DescribeModule',
        'username': username,
        'password': password,
        'module': moduleName
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      return res.status(200).json(JSON.parse(response.body));
    });
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;