const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(contactid) {
  // const offset = helper.getOffset(id, config.listPerPage);
  const query = `SELECT * FROM vtiger_contactdetails 
                INNER JOIN vtiger_contactaddress ON vtiger_contactaddress.contactaddressid=vtiger_contactdetails.contactid 
                INNER JOIN vtiger_contactscf ON vtiger_contactscf.contactid=vtiger_contactdetails.contactid 
                INNER JOIN vtiger_contactsubdetails ON vtiger_contactsubdetails.contactsubscriptionid=vtiger_contactdetails.contactid 
                INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid=vtiger_contactdetails.contactid 
                WHERE vtiger_crmentity.deleted=0 AND vtiger_contactdetails.contactid= '${contactid}'`;
  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);
  return {
    "success": true,
    result: data
  }
}

module.exports = {
  getMultiple
}