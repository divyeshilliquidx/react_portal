const mysql = require('mysql');
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page, searchField, type) {
  //userName, userPassword
  const offset = helper.getOffset(page, config.listPerPage);
  // console.log(offset)
  // const query = `SELECT vtiger_securities.securitiesid, vtiger_securities.ticker, vtiger_securities.cusip_isin, vtiger_securities.type,
  // vtiger_securities.shortname, vtiger_securities.issuer_debtor, vtiger_securities.country, vtiger_securities.ask_price,
  // vtiger_securities.bid_price, IFNULL(vtiger_currency_info.currency_name,'') as currency, vtiger_crmentity.smownerid,
  // vtiger_crmentity.createdtime FROM vtiger_securities INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_securities.securitiesid
  // LEFT JOIN vtiger_currency_info ON vtiger_securities.currency = vtiger_currency_info.id AND vtiger_currency_info.deleted = 0 LEFT JOIN vtiger_issuerdebtor ON vtiger_issuerdebtor.issuerdebtorid = vtiger_securities.issuer_debtor
  // WHERE vtiger_crmentity.deleted = 0 ORDER BY vtiger_crmentity.createdtime DESC LIMIT ${offset},${config.listPerPage}`;

  //const searchField = ''; // Provide the search field value
  // const type = ''; // Provide the type value
  //const pagina = 0; // Provide the pagina value

  let query = `
    SELECT
      vtiger_securities.securitiesid,
      vtiger_securities.ticker,
      vtiger_securities.cusip_isin,
      vtiger_securities.type,
      vtiger_securities.shortname,
      vtiger_securities.issuer_debtor,
      vtiger_securities.country,
      vtiger_securities.ask_price,
      vtiger_securities.bid_price,
      IFNULL(vtiger_currency_info.currency_name, '') as currency,
      vtiger_crmentity.smownerid,
      vtiger_crmentity.createdtime
    FROM vtiger_securities
      INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_securities.securitiesid
      LEFT JOIN vtiger_currency_info ON vtiger_securities.currency = vtiger_currency_info.id AND vtiger_currency_info.deleted = 0
      LEFT JOIN vtiger_issuerdebtor ON vtiger_issuerdebtor.issuerdebtorid = vtiger_securities.issuer_debtor
    WHERE vtiger_crmentity.deleted = 0`;

  const params = [];

  if (searchField != '') {
    query += `
      AND (
        vtiger_securities.cusip_isin LIKE ? OR
        vtiger_securities.ticker LIKE ? OR
        vtiger_securities.shortname LIKE ? OR
        vtiger_securities.country LIKE ? OR
        vtiger_issuerdebtor.identifier LIKE ?
      )
    `;
    params.push(`%${searchField}%`, `%${searchField}%`, `%${searchField}%`, `%${searchField}%`, `%${searchField}%`);
  }

  if (type != '') {
    query += ` AND vtiger_securities.type = ? `;
    params.push(type);
  }

  query += ` ORDER BY vtiger_crmentity.createdtime DESC `;

  if (searchField) {
    query += ` LIMIT 500 `;
  } else {
    query += ` LIMIT  ${offset}, ${config.listPerPage}`;
  }

  const formattedQuery = mysql.format(query, params);
  const rows = await db.query(formattedQuery);
  const data = helper.emptyOrRows(rows);
  const result = { 'success': true, 'result': data };
  return result;
}

module.exports = {
  getMultiple
}