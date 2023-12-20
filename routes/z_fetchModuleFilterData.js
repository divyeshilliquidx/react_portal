const express = require('express');
const session = require('express-session');
const router = express.Router();
const fetchCRMRecordByQuery = require('../services/fetchCRMRecordByQuery');

// For Joi
const Joi = require('joi');

// Define a custom validation error messages object
const customMessages = {
  'any.required': 'The {{#label}} field is required.',
  'string.empty': 'The {{#label}} field is required.',
};

// Define a Joi schema for request validation
const schema = Joi.object({
  query: Joi.required().messages(customMessages),
  module: Joi.required().messages(customMessages),
});

router.post('/', async function (req, res, next) {
  try {

    const contactid = req.session.userId;
    if (!contactid) {
      return res.status(400).json({ success: false, 'message': 'Login Required' });
    }
    // Validate the request body against the schema
    const { error, value } = schema.validate(req.body);
    if (error) {
      // Extract and return validation error messages

      //const validationErrors = error.details.map((detail) => detail.message);
      // return res.status(400).json({ success: false, message: validationErrors[0] });
      return res.status(400).json({ success: false, details: error.details });
    }

    const requestData = value; // Use the validated request data
    const query = requestData.query;
    const module = requestData.module;
    if (module != 'Reports') {
      return res.status(400).json({ success: false, 'message': 'Only Report Module Allow' });
    }

    const response = await fetchCRMRecordByQuery.getMultiple(query);
    return res.status(200).json(response);
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;