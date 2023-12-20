const session = require('express-session');
//const bcrypt = require('bcrypt');
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(req, userName, userPassword) {
  // const offset = helper.getOffset(id, config.listPerPage);
  // console.log(offset)
  const query = `SELECT id, user_name, user_password,last_login_time, isactive, support_start_date, support_end_date, cryptmode FROM vtiger_portalinfo 
  INNER JOIN vtiger_customerdetails ON vtiger_portalinfo.id=vtiger_customerdetails.customerid 
  INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid=vtiger_portalinfo.id 
  WHERE vtiger_crmentity.deleted=0 AND user_name= '${userName}' AND isactive=1 AND vtiger_customerdetails.portal=1`;

  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);
  const encryptedPassword = data[0].user_password;
  const compareEncryptedPassword = await helper.compareEncryptedPassword(userPassword, encryptedPassword);

  if (compareEncryptedPassword) {
    req.session.userId = data[0].id;
    const currentDateTime = await helper.getCurrentDateTime();
    const update_query = `UPDATE vtiger_portalinfo SET login_time='${currentDateTime}' WHERE id=${data[0].id}`;
    await db.query(update_query);
    var result = { 'success': true, 'message': 'Login Successfully', 'result': data };
  } else {
    var result = { 'success': false, 'message': 'Please check User Name and Password', 'result': [] };
  }
  return result;
}

module.exports = {
  getMultiple
}