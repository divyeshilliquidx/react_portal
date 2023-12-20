const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(status, contactid) {
  const modifiedtime = helper.getCurrentDateTime();
  if (status == 'Login') {
    var query = `UPDATE vtiger_portalinfo SET login_time='${modifiedtime}' WHERE id=${contactid}`;
  } else if (status == 'Logout') {
    var query = `UPDATE vtiger_portalinfo SET logout_time='${modifiedtime}', last_login_time=login_time WHERE id=${contactid}`;
  }
  const rows = await db.query(query);
  //const data = helper.emptyOrRows(rows);
  return {
    "success": true,
  }
}

module.exports = {
  getMultiple
}