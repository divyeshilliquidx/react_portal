const mysql = require('mysql');
const db = require('./db');
const helper = require('../helper');

// async function getMultiple(contactid, new_password) {

//   const generateHashedPassword = await helper.generateHashedPassword(new_password);
//   if (generateHashedPassword) {
//     let query = `UPDATE vtiger_portalinfo SET user_password=? WHERE id=?`;
//     const params = [];
//     params.push(`${generateHashedPassword}`, `${contactid}`);
//     const formattedQuery = mysql.format(query, params);
//     const rows = await db.query(formattedQuery);
//     var result = { 'success': true, 'message': 'Password is successfully Update' };
//   } else {
//     var result = { 'success': false, 'message': 'Password not update' };
//   }
//   return result;
// }

async function getMultiple(contactid, new_password) {
  try {
    const generateHashedPassword = await helper.generateHashedPassword(new_password);

    if (generateHashedPassword) {
      let query = `UPDATE vtiger_portalinfo SET user_password=? WHERE id=?`;
      const params = [generateHashedPassword, contactid];
      const formattedQuery = mysql.format(query, params);
      await db.query(formattedQuery);
      var result = { 'success': true, 'message': 'Password is successfully updated' };
    } else {
      var result = { 'success': false, 'message': 'Password not updated' };
    }
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle the error gracefully or rethrow it as needed
    throw error;
  }
}

module.exports = {
  getMultiple
}