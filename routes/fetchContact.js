const express = require('express');
const session = require('express-session');
const router = express.Router();
const fetchContact = require('../services/fetchContact');

/* GET programming languages. */
router.get('/', async function (req, res, next) {
  try {
    const contactid = req.session.userId;
    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }
    res.json(await fetchContact.getMultiple(contactid));
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;