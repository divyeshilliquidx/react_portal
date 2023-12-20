const express = require('express');
const router = express.Router();
const getWatchlists = require('../services/getWatchlists');

router.post('/', async function (req, res, next) {
  try {
    const requestData = req.body;
    const page = requestData.page;
    const searchField = requestData.searchField;
    const contactid = requestData.contactid;
    //const user_password = requestData.user_password;
    res.json(await getWatchlists.getMultiple(contactid,page,searchField));
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;