const express = require('express');
const session = require('express-session');
const router = express.Router();
const fetchReferenceRecords = require('../services/fetchReferenceRecords');

// For Joi
const Joi = require('joi');

// Define a custom validation error messages object
const customMessages = {
  'any.required': 'The {{#label}} field is required.',
  'string.empty': 'The {{#label}} field is required.',
};

// Define a Joi schema for request validation
const schema = Joi.object({
  module: Joi.required().messages(customMessages),
  page: Joi.required().messages(customMessages),
  module: Joi.required().messages(customMessages),
  crmid: Joi.number().messages(customMessages),
  search_params: Joi.array().messages(customMessages),
  contactid: Joi.required().messages(customMessages),
});

router.post('/', async function (req, res, next) {
  try {
    //const contactid = req.session.userId;
    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }
    // Validate the request body against the schema
    const { error, value } = schema.validate(req.body);
    if (error) {
      // Extract and return validation error messages

      //const validationErrors = error.details.map((detail) => detail.message);
      // return res.status(400).json({ success: false, message: validationErrors[0] });
      return res.status(400).json({ success: false, details: error.details });
    }

    const requestData = value; // Use the validated request data

    const contactid = requestData.contactid;
    const module = requestData.module;
    const page = requestData.page;
    const crmid = requestData.crmid;
    const search_params = requestData.search_params;
    //console.log(search_params);
    res.json(await fetchReferenceRecords.getMultiple(contactid, module, page, crmid, search_params));
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;