const express = require('express');
const session = require('express-session');
const router = express.Router();
const updateLoginDetails = require('../services/updateLoginDetails');

router.get('/', async function (req, res, next) {
  try {
    const contactid = session.userId;
    if (!contactid) {
      return res.status(400).json({ success: false, 'message': 'Login Required' });
    }
    const status = req.body.status;
    //const contactid = req.body.contactid;
    res.json(await updateLoginDetails.getMultiple(status, contactid));
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;