const express = require('express');
const session = require('express-session');
const router = express.Router();
const updateContact = require('../services/updateContact');

// For Joi
const Joi = require('joi');

// Define a custom validation error messages object
const customMessages = {
  'number.base': 'Contact ID must be a number.',
  'number.integer': 'Contact ID must be an integer.',
  'number.positive': 'Contact ID must be an positive.',
  'number.min': 'Contact ID must be greater than or equal to 1.',
  'string.min': 'New password must be at least 6 characters long.',
  'any.required': 'The {{#label}} field is required.',
  'string.empty': 'The {{#label}} field is required.',
};

// Define a Joi schema for request validation
const schema = Joi.object({
  recordid: Joi.number().integer().positive().messages(customMessages),
  firstname: Joi.string().messages(customMessages),
  lastname: Joi.string().messages(customMessages),
  email: Joi.string().messages(customMessages),
  salutation: Joi.string().messages(customMessages),
  mailingstreet: Joi.string().messages(customMessages),
  accountname: Joi.string().messages(customMessages),
  ship_street: Joi.string().messages(customMessages),
});

// recordid: Joi.number().integer().positive().required().messages(customMessages),
// firstname: Joi.string().required().messages(customMessages),
// lastname: Joi.string().required().messages(customMessages),
// email: Joi.string().required().messages(customMessages),
// salutation: Joi.string().messages(customMessages),
// mailingstreet: Joi.string().messages(customMessages),

router.post('/', async function (req, res, next) {
  try {

    // if (!session.userId) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }

    /*Validate the request body against the schema*/
    const { error, value } = schema.validate(req.body);

    if (error) {
      /*Extract and return validation error messages*/

      //const validationErrors = error.details.map((detail) => detail.message);
      // return res.status(400).json({ success: false, message: validationErrors[0] });
      return res.status(400).json({ success: false, details: error.details });
    }

    const requestData = value; // Use the validated request data
    const columns = Object.keys(requestData);
    const values = Object.values(requestData);
    res.json(await updateContact.getMultiple(columns, values));
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;