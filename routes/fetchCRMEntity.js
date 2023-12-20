const express = require('express');
const session = require('express-session');
const router = express.Router();
const fetchCRMEntity = require('../services/fetchCRMEntity');

/* GET programming languages. */
router.get('/', async function (req, res, next) {
  try {
    const contactid = req.session.userId;
    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }
    var label = req.query.label;
    var module = req.query.module;
    res.json(await fetchCRMEntity.getMultiple(label, module));
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
});

module.exports = router;