const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple() {
  const query = `SELECT * FROM vtiger_organizationdetails WHERE organization_id = 1`;
  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);
  data[0]['logo_path'] = 'test/logo/' + data[0]['logoname'];
  return {
    "success": true,
    result: data[0]
  }
}

module.exports = {
  getMultiple
}