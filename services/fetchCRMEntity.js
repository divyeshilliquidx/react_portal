const mysql = require('mysql');
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(label, module) {
  //const offset = helper.getOffset(page, config.listPerPage);
  //const rows = await db.query(`SELECT * FROM vtiger_crmentity LIMIT ${offset},${config.listPerPage}`);
  // if(label !=''){
  //   var query = " AND vtiger_contactdetails.label LIKE "+label%';
  // }
  // const rows = await db.query(` LIMIT 20`);

  let query = `SELECT crmid,label FROM vtiger_crmentity WHERE vtiger_crmentity.deleted = 0`;
  const params = [];
  //console.log(label)
  if (label != '' && label !== undefined) {
    query += ` AND (vtiger_crmentity.label LIKE ?) `;
    params.push(`%${label}%`);
  }
  if (module != '' && module !== undefined) {
    query += ` AND (vtiger_crmentity.setype = ?) `;
    params.push(`${module}`);
  }

  query += ` ORDER BY vtiger_crmentity.modifiedtime DESC `;

  // if (label != '' && label !== undefined) {
  //   query += ` LIMIT 500 `;
  // } else {

  // }
  //query += ` LIMIT 20`;
  const formattedQuery = mysql.format(query, params);
  const rows = await db.query(formattedQuery);
  const data = helper.emptyOrRows(rows);
  return {
    "success": true,
    result: data
  }
}

module.exports = {
  getMultiple
}