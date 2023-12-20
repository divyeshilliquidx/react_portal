const express = require('express');
const session = require('express-session');
const router = express.Router();
const updateRecord = require('../services/updateRecord');


// const fieldValidation = require('../services/fieldValidation.js');
// const schema = fieldValidation.fieldValidation();

router.post('/', async function (req, res, next) {
  try {

    const contactid = req.session.userId;
    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }

    /*Validate the request body against the schema*/
    // const { error, value } = schema.validate(req.body);

    // if (error) {
    //   /*Extract and return validation error messages*/
    //   //const validationErrors = error.details.map((detail) => detail.message);
    //   // return res.status(400).json({ success: false, message: validationErrors[0] });
    //   return res.status(400).json({ success: false, details: error.details });
    // }

    const requestData = req.body; // Use the validated request data
    const columns = Object.keys(requestData);
    const values = Object.values(requestData);
    res.json(await updateRecord.getMultiple(columns, values));
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;