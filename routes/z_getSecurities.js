const express = require('express');
const router = express.Router();
const getSecurities = require('../services/getSecurities');

router.post('/', async function (req, res, next) {
  try {
    const requestData = req.body;
    const page = requestData.page;
    const searchField = requestData.searchField;
    const type = requestData.type;
    //const user_password = requestData.user_password;
    res.json(await getSecurities.getMultiple(page,searchField,type));
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;