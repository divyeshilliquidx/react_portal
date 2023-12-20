const express = require('express');
const router = express.Router();
const getSecuritiesDetails = require('../services/getSecuritiesDetails');

// For Joi
const Joi = require('joi');

// Define a custom validation error messages object
const customMessages = {
  'number.base': 'Security ID must be a number.',
  'number.integer': 'Security ID must be an integer.',
  'number.positive': 'Security ID must be an positive.',
  'string.empty': 'The {{#label}} field is required.',
};

// Define a Joi schema for request validation
const schema = Joi.object({
  securityid: Joi.number().integer().positive().required().messages(customMessages)
});

router.post('/', async function (req, res, next) {
  try {
    // Validate the request body against the schema
    const { error, value } = schema.validate(req.body);

    if (error) {
      // Extract and return validation error messages
      //const validationErrors = error.details.map((detail) => detail.message);
      // return res.status(400).json({ success: false, message: validationErrors[0] });
      return res.status(400).json({ success: false, details: error.details });
    }

    const requestData = value; // Use the validated request data
    const securityid = requestData.securityid;

    res.json(await getSecuritiesDetails.getMultiple(securityid));
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});


// router.post('/', async function (req, res, next) {
//   try {
//     const requestData = req.body;
//     const securityid = requestData.securityid;
//     res.json(await getSecuritiesDetails.getMultiple(securityid));
//   } catch (err) {
//     console.error(`Error while getting`, err.message);
//     next(err);
//   }
// });

module.exports = router;