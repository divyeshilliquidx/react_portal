//v8_portal_api_nodejs\services\fetchAnnouncement.js
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple() {
  const query = `SELECT announcement FROM vtiger_customerportal_settings LIMIT 1`;
  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);
  const announcement = data[0];
  return {
    "success": true,
    result: announcement
  }
}

module.exports = {
  getMultiple
}