const express = require('express');
const session = require('express-session');
const router = express.Router();
const fetchUserProfile = require('../services/fetchUserProfile');

/* GET programming languages. */
router.get('/', async function (req, res, next) {
  try {
    // const contactid = req.session.userId;
    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }
    const contactid = req.query.contactid;
    res.json(await fetchUserProfile.getMultiple(contactid));
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;