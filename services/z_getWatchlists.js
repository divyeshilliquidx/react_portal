const mysql = require('mysql');
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(contactid, page, searchField) {
  //userName, userPassword
  const offset = helper.getOffset(page, config.listPerPage);

  let query = `SELECT vtiger_watchlists.watchlistsid, vtiger_securities.securitiesid, vtiger_crmentity.label, vtiger_securities.cusip_isin, vtiger_securities.ticker, vtiger_securities.shortname, vtiger_securities.type, vtiger_currency_info.currency_name as currency, vtiger_securities.country, vtiger_securities.issuer_debtor, vtiger_securities.other_details, vtiger_securities.ask_price, vtiger_securities.bid_price, vtiger_crmentity.smownerid FROM vtiger_watchlists 
  INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_watchlists.watchlistsid 
  INNER JOIN vtiger_securities ON vtiger_securities.securitiesid = vtiger_watchlists.security 
  LEFT JOIN vtiger_currency_info ON vtiger_currency_info.id = vtiger_securities.currency 
  WHERE vtiger_crmentity.deleted = 0 AND vtiger_watchlists.contact = ?`;

  const params = [];
  params.push(`${contactid}`);
  if (searchField != '') {
    query += `AND (
        vtiger_securities.cusip_isin LIKE ? OR 
        vtiger_securities.ticker LIKE ? OR 
        vtiger_securities.shortname LIKE ? OR 
        vtiger_securities.country LIKE ?
      )`;
    params.push(`%${searchField}%`, `%${searchField}%`, `%${searchField}%`, `%${searchField}%`);
  }
  query += ` ORDER BY vtiger_crmentity.createdtime DESC `;
  query += ` LIMIT  ${offset}, ${config.listPerPage}`;

  const formattedQuery = mysql.format(query, params);
  const rows = await db.query(formattedQuery);
  const data = helper.emptyOrRows(rows);
  const result = { 'success': true, 'result': data };
  return result;
}

module.exports = {
  getMultiple
}