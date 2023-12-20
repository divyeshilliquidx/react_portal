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
  username: Joi.string().required().messages(customMessages),
  userpassword: Joi.string().required().messages(customMessages),
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
    const userName = requestData.username;
    const userPassword = requestData.userpassword;

    const query = `SELECT id, user_name, user_password,last_login_time, isactive, support_start_date, support_end_date, cryptmode FROM vtiger_portalinfo INNER JOIN vtiger_customerdetails ON vtiger_portalinfo.id=vtiger_customerdetails.customerid INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid=vtiger_portalinfo.id WHERE vtiger_crmentity.deleted=0 AND vtiger_portalinfo.user_name= ? AND isactive=1 AND vtiger_customerdetails.portal=1`;
    const params = [userName];
    const result = mysql.format(query, params);
    const rows = await db.query(result);
    const data = helper.emptyOrRows(rows);
    if (data.length === 0) {
      return res.status(500).json({ success: false, message: 'Login fail, invalid credentials' });
    }
    const encryptedPassword = data[0].user_password;
    const contactid = data[0].id;
    const compareEncryptedPassword = await helper.compareEncryptedPassword(userPassword, encryptedPassword);
    if (compareEncryptedPassword) {
      req.session.userId = contactid;
      req.session.password = userPassword;
      req.session.username = userName;
      const currentDateTime = await helper.getCurrentDateTime();
      const update_query = `UPDATE vtiger_portalinfo SET login_time=? WHERE id=?`;
      const params2 = [currentDateTime, contactid];
      const result2 = mysql.format(update_query, params2);
      await db.query(result2);
      return res.status(200).json({ success: true, message: 'Login successful', 'result': data[0] });
    } else {
      return res.status(500).json({ success: false, message: 'Login fail, invalid credentials' });
    }
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;


