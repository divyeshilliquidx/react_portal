const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(id) {
  // const offset = helper.getOffset(id, config.listPerPage);
  const query = `SELECT * FROM vtiger_portalinfo 
              INNER JOIN vtiger_contactdetails ON vtiger_contactdetails.contactid=vtiger_portalinfo.id
              INNER JOIN vtiger_customerdetails ON vtiger_portalinfo.id=vtiger_customerdetails.customerid 
              INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid=vtiger_portalinfo.id 
              WHERE vtiger_crmentity.deleted=0 AND vtiger_portalinfo.id= '${id}' AND vtiger_portalinfo.isactive=1 AND vtiger_customerdetails.portal= 1`;

  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);
  return {
    "success": true,
    result: data[0]
  }
}

module.exports = {
  getMultiple
}