const express = require('express');
const session = require('express-session');
const router = express.Router();
const fetchCompanyDetails = require('../services/fetchCompanyDetails');

router.get('/', async function (req, res, next) {
  try {
    const contactid = req.session.userId;
    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }
    res.json(await fetchCompanyDetails.getMultiple());
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;