const mysql = require('mysql');
const db = require('./db');
const helper = require('../helper');



async function getMultiple(query) {
  try {

    const sql_query = query[0];
    if (!sql_query.trim().match(/^SELECT/i)) {
      return { 'success': false, message: 'Only SELECT queries are allowed.' };
    }
    
    // Regular expression to match table names (assumes table names consist of letters, numbers, and underscores)

    const tableRegex = /(?:FROM|JOIN)\s+([a-zA-Z0-9_]+)/g;
    const tableMatches = [];
    let match;

    while ((match = tableRegex.exec(sql_query)) !== null) {
      tableMatches.push(match[1]);
    }
    //const sql_query = `SELECT crmid  FROM vtiger_crmentity WHERE setype = 'Accounts' AND deleted = 1 LIMIT 150000`;
    const formattedQuery = mysql.format(sql_query, []);
    const rows = await db.query(formattedQuery);
    const data = helper.emptyOrRows(rows);
    var result = { 'success': true, data };
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