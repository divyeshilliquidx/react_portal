const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple() {
  const query = `SELECT vtiger_relatedlists.label, vtiger_customerportal_tabs.tabid, vtiger_customerportal_tabs.sequence,
            vtiger_customerportal_tabs.createrecord, vtiger_customerportal_tabs.editrecord, vtiger_customerportal_fields.records_visible,vtiger_tab.name
            FROM vtiger_customerportal_tabs
            INNER JOIN vtiger_tab ON vtiger_tab.tabid = vtiger_customerportal_tabs.tabid AND vtiger_tab.presence = ?
            INNER JOIN vtiger_relatedlists ON vtiger_customerportal_tabs.tabid = vtiger_relatedlists.related_tabid
            INNER JOIN vtiger_customerportal_fields ON vtiger_customerportal_fields.tabid = vtiger_customerportal_tabs.tabid
            WHERE vtiger_customerportal_tabs.visible = ?
            GROUP BY vtiger_customerportal_tabs.tabid
            ORDER BY vtiger_customerportal_tabs.sequence ASC`;
  const rows = await db.query(query, [0, 1]);
  const data = helper.emptyOrRows(rows);
  return {
    "success": true,
    result: data
  }
}

module.exports = {
  getMultiple
}