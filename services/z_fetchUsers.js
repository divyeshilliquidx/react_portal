const mysql = require('mysql');
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple() {
  //const offset = helper.getOffset(page, config.listPerPage);
  //const rows = await db.query(`SELECT * FROM vtiger_crmentity LIMIT ${offset},${config.listPerPage}`);
  // if(firstname !=''){
  //   var query = " AND vtiger_contactdetails.firstname LIKE "+firstname%';
  // }
  // const rows = await db.query(` LIMIT 20`);


  let query = `SELECT * FROM vtiger_users WHERE user_name IN ('roberto','audrey')`;
  const params = [];
  const formattedQuery = mysql.format(query, params);
  // console.log(formattedQuery)
  const rows = await db.query(formattedQuery);
  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}

module.exports = {
  getMultiple
}