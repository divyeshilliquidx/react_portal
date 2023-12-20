const express = require('express');
const router = express.Router();
const getListValuesPortfolios = require('../services/getListValuesPortfolios');

router.post('/', async function (req, res, next) {
  try {
    const requestData = req.body;
    const contactid = requestData.contactid;
    //const user_password = requestData.user_password;
    res.json(await getListValuesPortfolios.getMultiple(contactid));
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;