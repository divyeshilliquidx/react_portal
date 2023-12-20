const mysql = require('mysql');
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(contactid) {

  let query = `SELECT vtiger_portfolios.portfoliosid, vtiger_portfolios.security, vtiger_securities.cusip_isin, vtiger_securities.shortname, vtiger_securities.ask_price, vtiger_securities.bid_price, vtiger_portfolios.contact, vtiger_portfolios.quantity, vtiger_portfolios.all_or_none, vtiger_portfolios.claim_number, vtiger_portfolios.claim_date, vtiger_crmentity.createdtime, vtiger_issuerdebtor.identifier, vtiger_currency_info.currency_name as currency, vtiger_crmentity.smownerid FROM vtiger_portfolios INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_portfolios.portfoliosid INNER JOIN vtiger_securities ON vtiger_securities.securitiesid = vtiger_portfolios.security INNER JOIN vtiger_issuerdebtor ON vtiger_issuerdebtor.issuerdebtorid = vtiger_securities.issuer_debtor LEFT JOIN vtiger_currency_info ON vtiger_currency_info.id = vtiger_securities.currency WHERE vtiger_crmentity.deleted = 0 AND vtiger_portfolios.contact = ?`;

  const params = [];
  params.push(`${contactid}`);

  const formattedQuery = mysql.format(query, params);
  const rows = await db.query(formattedQuery);
  const data = helper.emptyOrRows(rows);
  const result = { 'success': true, 'result': data };
  return result;
}

module.exports = {
  getMultiple
}