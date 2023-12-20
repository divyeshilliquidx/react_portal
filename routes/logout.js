const express = require('express');
const mysql = require('mysql');
const db = require('../services/db');
const helper = require('../helper');
const router = express.Router();

router.get('/', async function (req, res, next) {
  try {

    const contactid = req.session.userId;
    // if (!contactid) {
    //   return res.status(400).json({ success: false, 'message': 'Login Required' });
    // }
    const currentDateTime = await helper.getCurrentDateTime();
    const query = `UPDATE vtiger_portalinfo SET logout_time=?, last_login_time=login_time WHERE id=?`;
    const params = [currentDateTime, contactid];
    const result = mysql.format(query, params);
    await db.query(result);
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error logging out' });
      }
      return res.status(200).json({ success: true, message: 'Logout successful' });
    });
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

module.exports = router;