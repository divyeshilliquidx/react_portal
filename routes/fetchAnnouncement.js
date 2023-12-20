const express = require('express');
const router = express.Router();
const fetchAnnouncement = require('../services/fetchAnnouncement');

router.get('/', async function (req, res, next) {
  try {
    const contactid = req.session.userId;
    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }
    res.json(await fetchAnnouncement.getMultiple());
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;