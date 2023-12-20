const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../services/db');
const helper = require('../helper');

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
  contactid: Joi.number().integer().positive().required().messages(customMessages),
  new_password: Joi.string().required().messages(customMessages),
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
    const new_password = requestData.new_password;
    const generateHashedPassword = await helper.generateHashedPassword(new_password);
    if (generateHashedPassword) {
      let query = `UPDATE vtiger_portalinfo SET user_password=? WHERE id=?`;
      const params = [generateHashedPassword, contactid];
      const result = mysql.format(query, params);
      await db.query(result);
      return res.status(200).json({ success: true, message: 'Password is successfully updated' });
    } else {
      return res.status(500).json({ success: false, message: 'Password not updated' });
    }
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;