const mysql = require('mysql');
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(securityid) {

  let query = `SELECT s.securitiesid, s.cusip_isin, s.ticker, s.shortname, s.type, s.country, s.issuer_debtor,i.identifier AS identifier, s.other_details, ci.currency_name AS currency,ce.* FROM vtiger_securities s INNER JOIN vtiger_crmentity ce ON ce.crmid = s.securitiesid INNER JOIN vtiger_currency_info ci ON s.currency = ci.id AND ci.deleted = 0 LEFT JOIN vtiger_issuerdebtor i ON i.issuerdebtorid = s.issuer_debtor WHERE ce.deleted = 0 AND s.securitiesid = ?`;

  const params = [];
  params.push(`${securityid}`);

  const formattedQuery = mysql.format(query, params);
  const rows = await db.query(formattedQuery);
  const data = helper.emptyOrRows(rows);
  const result = { 'success': true, 'result': data };
  return result;
}

module.exports = {
  getMultiple
}