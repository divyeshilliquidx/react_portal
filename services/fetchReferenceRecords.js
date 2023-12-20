const db = require('./db');
const mysql = require('mysql');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(contactid, module, page, crmid, search_params) {
  // const offset = helper.getOffset(id, config.listPerPage);
  var searchParams = search_params[0];

  if (module == 'HelpDesk') {
    var baseTable = 'vtiger_troubletickets';
    var query = `SELECT vtiger_troubletickets.*,vtiger_ticketcf.*,vtiger_crmentity.createdtime,vtiger_crmentity.createdtime,vtiger_crmentity.modifiedtime,vtiger_crmentity.smownerid,vtiger_crmentity.setype,vtiger_crmentity.label as crmentity_label FROM vtiger_troubletickets INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid=vtiger_troubletickets.ticketid LEFT JOIN vtiger_contactdetails ON vtiger_contactdetails.contactid=vtiger_troubletickets.contact_id LEFT JOIN vtiger_ticketcf ON vtiger_troubletickets.ticketid = vtiger_ticketcf.ticketid LEFT JOIN vtiger_users ON vtiger_users.id=vtiger_crmentity.smownerid LEFT JOIN vtiger_groups ON vtiger_groups.groupid=vtiger_crmentity.smownerid `;

    var conditionForContactId = ` WHERE vtiger_crmentity.deleted=0 AND vtiger_contactdetails.contactid=${contactid} `;
  } else if (module == 'Potentials') {

    var baseTable = 'vtiger_potential';
    var query = `SELECT vtiger_potential.*,vtiger_contactdetails.*,vtiger_potentialscf.*,vtiger_crmentity.createdtime,vtiger_crmentity.modifiedtime,vtiger_crmentity.smownerid,vtiger_crmentity.setype,vtiger_crmentity.label as crmentity_label  FROM vtiger_contactdetails LEFT JOIN vtiger_contpotentialrel ON vtiger_contpotentialrel.contactid=vtiger_contactdetails.contactid LEFT JOIN vtiger_potential ON (vtiger_potential.potentialid = vtiger_contpotentialrel.potentialid or vtiger_potential.contact_id=vtiger_contactdetails.contactid) INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_potential.potentialid LEFT JOIN vtiger_account ON vtiger_account.accountid=vtiger_contactdetails.accountid LEFT JOIN vtiger_potentialscf ON vtiger_potential.potentialid = vtiger_potentialscf.potentialid LEFT JOIN vtiger_groups ON vtiger_groups.groupid=vtiger_crmentity.smownerid LEFT JOIN vtiger_users ON vtiger_users.id=vtiger_crmentity.smownerid `;

    var conditionForContactId = ` WHERE vtiger_crmentity.deleted=0 AND vtiger_contactdetails.contactid =${contactid} `;
  } else if (module == 'Activities') {

    var baseTable = 'vtiger_activity';
    var query = `SELECT CASE WHEN (vtiger_users.user_name not like '') THEN vtiger_users.userlabel ELSE vtiger_groups.groupname END AS user_name, vtiger_cntactivityrel.contactid, vtiger_seactivityrel.crmid AS parent_id, vtiger_crmentity.createdtime,vtiger_crmentity.modifiedtime,vtiger_crmentity.smownerid,vtiger_crmentity.setype,vtiger_crmentity.label as crmentity_label, vtiger_activity.activitytype, vtiger_activity.subject, vtiger_activity.date_start, vtiger_activity.time_start, vtiger_activity.recurringtype, vtiger_activity.due_date, vtiger_activity.time_end, vtiger_activity.visibility, CASE WHEN (vtiger_activity.activitytype = 'Task') THEN (vtiger_activity.status) ELSE (vtiger_activity.eventstatus) END AS status FROM vtiger_activity INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_activity.activityid INNER JOIN vtiger_cntactivityrel ON vtiger_cntactivityrel.activityid = vtiger_activity.activityid LEFT JOIN vtiger_seactivityrel ON vtiger_seactivityrel.activityid = vtiger_activity.activityid LEFT JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smownerid LEFT JOIN vtiger_groups ON vtiger_groups.groupid = vtiger_crmentity.smownerid `;

    var conditionForContactId = ` WHERE vtiger_cntactivityrel.contactid = ${contactid} AND vtiger_crmentity.deleted = 0 AND vtiger_activity.activitytype <> 'Emails' `;
  } else if (module == 'Quotes') {

    var baseTable = 'vtiger_quotes';
    var query = `SELECT DISTINCT vtiger_crmentity.crmid,vtiger_quotes.subject, vtiger_quotes.quotestage, vtiger_quotes.contactid, vtiger_quotes.total, vtiger_quotes.accountid, vtiger_quotes.potentialid, vtiger_quotes.quote_no, vtiger_crmentity.smownerid FROM vtiger_quotes INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid=vtiger_quotes.quoteid left outer join vtiger_contactdetails ON vtiger_contactdetails.contactid=vtiger_quotes.contactid left outer join vtiger_potential ON vtiger_potential.potentialid=vtiger_quotes.potentialid LEFT JOIN vtiger_account ON vtiger_account.accountid = vtiger_quotes.accountid LEFT JOIN vtiger_quotescf ON vtiger_quotescf.quoteid = vtiger_quotes.quoteid LEFT JOIN vtiger_quotesbillads ON vtiger_quotesbillads.quotebilladdressid = vtiger_quotes.quoteid LEFT JOIN vtiger_quotesshipads ON vtiger_quotesshipads.quoteshipaddressid = vtiger_quotes.quoteid LEFT JOIN vtiger_users ON vtiger_users.id=vtiger_crmentity.smownerid LEFT JOIN vtiger_groups ON vtiger_groups.groupid=vtiger_crmentity.smownerid `;

    var conditionForContactId = ` WHERE vtiger_crmentity.deleted=0 AND vtiger_contactdetails.contactid=${contactid} `;
  } else if (module == 'PurchaseOrder') {

    var baseTable = 'vtiger_purchaseorder';
    var query = `SELECT DISTINCT vtiger_crmentity.crmid,vtiger_purchaseorder.subject, vtiger_purchaseorder.contactid, vtiger_purchaseorder.postatus, vtiger_crmentity.smownerid, vtiger_purchaseorder.purchaseorder_no, vtiger_purchaseorder.vendorid, vtiger_purchaseorder.tracking_no, vtiger_purchaseorder.total FROM vtiger_purchaseorder INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid=vtiger_purchaseorder.purchaseorderid left outer join vtiger_vendor ON vtiger_purchaseorder.vendorid=vtiger_vendor.vendorid left outer join vtiger_contactdetails ON vtiger_contactdetails.contactid=vtiger_purchaseorder.contactid LEFT JOIN vtiger_users ON vtiger_users.id=vtiger_crmentity.smownerid LEFT JOIN vtiger_purchaseordercf ON vtiger_purchaseordercf.purchaseorderid = vtiger_purchaseorder.purchaseorderid LEFT JOIN vtiger_pobillads ON vtiger_pobillads.pobilladdressid = vtiger_purchaseorder.purchaseorderid LEFT JOIN vtiger_poshipads ON vtiger_poshipads.poshipaddressid = vtiger_purchaseorder.purchaseorderid LEFT JOIN vtiger_groups ON vtiger_groups.groupid=vtiger_crmentity.smownerid `;

    var conditionForContactId = ` WHERE vtiger_crmentity.deleted=0 AND vtiger_purchaseorder.contactid=${contactid} `;
  } else if (module == 'SalesOrder') {

    var baseTable = 'vtiger_salesorder';
    var query = `SELECT DISTINCT vtiger_crmentity.crmid,vtiger_salesorder.subject, vtiger_salesorder.contactid, vtiger_salesorder.sostatus, vtiger_salesorder.accountid, vtiger_crmentity.smownerid, vtiger_salesorder.salesorder_no, vtiger_salesorder.quoteid, vtiger_salesorder.total FROM vtiger_salesorder INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid=vtiger_salesorder.salesorderid LEFT JOIN vtiger_salesordercf ON vtiger_salesordercf.salesorderid = vtiger_salesorder.salesorderid LEFT JOIN vtiger_sobillads ON vtiger_sobillads.sobilladdressid = vtiger_salesorder.salesorderid LEFT JOIN vtiger_soshipads ON vtiger_soshipads.soshipaddressid = vtiger_salesorder.salesorderid LEFT JOIN vtiger_users ON vtiger_users.id=vtiger_crmentity.smownerid left outer join vtiger_quotes ON vtiger_quotes.quoteid=vtiger_salesorder.quoteid left outer join vtiger_account ON vtiger_account.accountid=vtiger_salesorder.accountid LEFT JOIN vtiger_invoice_recurring_info ON vtiger_invoice_recurring_info.salesorderid = vtiger_salesorder.salesorderid left outer join vtiger_contactdetails ON vtiger_contactdetails.contactid=vtiger_salesorder.contactid LEFT JOIN vtiger_groups ON vtiger_groups.groupid=vtiger_crmentity.smownerid `;

    var conditionForContactId = ` WHERE vtiger_crmentity.deleted=0 AND vtiger_salesorder.contactid = ${contactid} `;
  } else if (module == 'Products') {

    var baseTable = 'vtiger_products';
    var query = `SELECT DISTINCT vtiger_crmentity.crmid,vtiger_products.productname, vtiger_products.product_no, vtiger_products.discontinued, vtiger_products.productcategory, vtiger_products.qtyinstock, vtiger_products.productcode, vtiger_products.unit_price, vtiger_products.commissionrate, vtiger_products.qty_per_unit FROM vtiger_products INNER JOIN vtiger_seproductsrel ON vtiger_seproductsrel.productid=vtiger_products.productid AND vtiger_seproductsrel.setype="Contacts" INNER JOIN vtiger_productcf ON vtiger_products.productid = vtiger_productcf.productid INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_products.productid INNER JOIN vtiger_contactdetails ON vtiger_contactdetails.contactid = vtiger_seproductsrel.crmid LEFT JOIN vtiger_users ON vtiger_users.id=vtiger_crmentity.smownerid LEFT JOIN vtiger_groups ON vtiger_groups.groupid = vtiger_crmentity.smownerid `;
    var conditionForContactId = ` WHERE vtiger_contactdetails.contactid = ${contactid} AND vtiger_crmentity.deleted = 0 `;
  } else if (module == 'Documents') {

    var baseTable = 'vtiger_notes';
    var query = `SELECT vtiger_notes.*,vtiger_attachments.*,vtiger_crmentity.createdtime,vtiger_crmentity.modifiedtime,vtiger_crmentity.smownerid,vtiger_crmentity.setype,vtiger_crmentity.label as crmentity_label FROM vtiger_notes INNER JOIN vtiger_senotesrel ON vtiger_senotesrel.notesid= vtiger_notes.notesid LEFT JOIN vtiger_notescf ON vtiger_notescf.notesid= vtiger_notes.notesid INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid= vtiger_notes.notesid AND vtiger_crmentity.deleted=0 INNER JOIN vtiger_crmentity crm2 ON crm2.crmid=vtiger_senotesrel.crmid LEFT JOIN vtiger_groups ON vtiger_groups.groupid = vtiger_crmentity.smownerid LEFT JOIN vtiger_seattachmentsrel ON vtiger_seattachmentsrel.crmid =vtiger_notes.notesid LEFT JOIN vtiger_attachments ON vtiger_seattachmentsrel.attachmentsid = vtiger_attachments.attachmentsid LEFT JOIN vtiger_users ON vtiger_crmentity.smownerid= vtiger_users.id `;

    var conditionForContactId = ` WHERE crm2.crmid=${contactid} AND vtiger_notes.filestatus = 1 AND vtiger_crmentity.deleted = 0 GROUP BY vtiger_notes.notesid `;
  } else if (module == 'Campaigns') {

    var baseTable = 'vtiger_campaign';
    var query = `SELECT DISTINCT vtiger_crmentity.crmid,vtiger_campaign.campaignname, vtiger_crmentity.smownerid, vtiger_campaign.campaignstatus, vtiger_campaign.campaigntype, vtiger_campaign.closingdate, vtiger_campaign.expectedrevenue FROM vtiger_campaign INNER JOIN vtiger_campaigncontrel ON vtiger_campaigncontrel.campaignid=vtiger_campaign.campaignid INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_campaign.campaignid INNER JOIN vtiger_campaignscf ON vtiger_campaignscf.campaignid = vtiger_campaign.campaignid LEFT JOIN vtiger_groups ON vtiger_groups.groupid=vtiger_crmentity.smownerid LEFT JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smownerid `;

    var conditionForContactId = ` WHERE vtiger_campaigncontrel.contactid=${contactid} AND vtiger_crmentity.deleted=0 `;
  } else if (module == 'Invoice') {

    var baseTable = 'vtiger_invoice';
    var query = `SELECT DISTINCT vtiger_crmentity.crmid,vtiger_invoice.subject, vtiger_invoice.contactid, vtiger_invoice.accountid, vtiger_invoice.invoicestatus, vtiger_crmentity.smownerid, vtiger_invoice.salesorderid, vtiger_invoice.invoice_no, vtiger_invoice.total FROM vtiger_invoice INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_invoice.invoiceid LEFT OUTER JOIN vtiger_contactdetails ON vtiger_contactdetails.contactid = vtiger_invoice.contactid LEFT OUTER JOIN vtiger_salesorder ON vtiger_salesorder.salesorderid = vtiger_invoice.salesorderid LEFT JOIN vtiger_groups ON vtiger_groups.groupid = vtiger_crmentity.smownerid LEFT JOIN vtiger_invoicecf ON vtiger_invoicecf.invoiceid = vtiger_invoice.invoiceid LEFT JOIN vtiger_invoicebillads ON vtiger_invoicebillads.invoicebilladdressid = vtiger_invoice.invoiceid LEFT JOIN vtiger_invoiceshipads ON vtiger_invoiceshipads.invoiceshipaddressid = vtiger_invoice.invoiceid LEFT JOIN vtiger_users ON vtiger_crmentity.smownerid = vtiger_users.id `;

    var conditionForContactId = ` WHERE vtiger_crmentity.deleted = 0 AND vtiger_contactdetails.contactid = ${contactid} `;
  } else if (module == 'ServiceContracts') {

    var baseTable = 'vtiger_servicecontracts';
    var query = `SELECT DISTINCT vtiger_crmentity.crmid,vtiger_servicecontracts.subject, vtiger_servicecontracts.contract_no, vtiger_crmentity.smownerid, vtiger_servicecontracts.total_units, vtiger_servicecontracts.used_units FROM vtiger_servicecontracts INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_servicecontracts.servicecontractsid LEFT JOIN vtiger_servicecontractscf ON vtiger_servicecontractscf.servicecontractsid = vtiger_servicecontracts.servicecontractsid INNER JOIN vtiger_contactdetails AS vtiger_contactdetailsContacts ON vtiger_contactdetailsContacts.contactid = vtiger_servicecontracts.sc_related_to LEFT JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smownerid LEFT JOIN vtiger_groups ON vtiger_groups.groupid = vtiger_crmentity.smownerid `;
    var conditionForContactId = ` WHERE vtiger_crmentity.deleted = 0 AND vtiger_contactdetailsContacts.contactid = ${contactid} `;
  } else if (module == 'Services') {

    var baseTable = 'vtiger_service';
    var query = `SELECT DISTINCT vtiger_crmentity.crmid,vtiger_service.servicename, vtiger_service.service_no, vtiger_service.qty_per_unit, vtiger_service.unit_price, vtiger_service.commissionrate FROM vtiger_service INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_service.serviceid INNER JOIN vtiger_crmentityrel ON (vtiger_crmentityrel.relcrmid = vtiger_crmentity.crmid OR vtiger_crmentityrel.crmid = vtiger_crmentity.crmid) LEFT JOIN vtiger_servicecf ON vtiger_servicecf.serviceid = vtiger_service.serviceid LEFT JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smownerid LEFT JOIN vtiger_groups ON vtiger_groups.groupid = vtiger_crmentity.smownerid `;
    var conditionForContactId = ` WHERE vtiger_crmentity.deleted = 0 AND (vtiger_crmentityrel.crmid = ${contactid} OR vtiger_crmentityrel.relcrmid = ${contactid}) `;
  } else if (module == 'Projects') {

    var baseTable = 'vtiger_project';
    var query = `SELECT DISTINCT vtiger_crmentity.crmid,vtiger_project.projectname, vtiger_project.linktoaccountscontacts, vtiger_project.startdate, vtiger_crmentity.smownerid, vtiger_project.targetenddate, vtiger_project.projectstatus, vtiger_project.projecttype FROM vtiger_project INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_project.projectid LEFT JOIN vtiger_projectcf ON vtiger_projectcf.projectid = vtiger_project.projectid INNER JOIN vtiger_contactdetails AS vtiger_contactdetailsContacts ON vtiger_contactdetailsContacts.contactid = vtiger_project.linktoaccountscontacts LEFT JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smownerid LEFT JOIN vtiger_groups ON vtiger_groups.groupid = vtiger_crmentity.smownerid `;

    var conditionForContactId = ` WHERE vtiger_crmentity.deleted=0 AND vtiger_contactdetailsContacts.contactid=${contactid} `;
  } else if (module == 'Assets') {

    var baseTable = 'vtiger_assets';
    var query = `SELECT DISTINCT vtiger_crmentity.crmid,vtiger_assets.assetname, vtiger_assets.asset_no, vtiger_assets.product, vtiger_assets.account FROM vtiger_assets INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_assets.assetsid LEFT JOIN vtiger_assetscf ON vtiger_assetscf.assetsid = vtiger_assets.assetsid INNER JOIN vtiger_contactdetails AS vtiger_contactdetailsContacts ON vtiger_contactdetailsContacts.contactid = vtiger_assets.contact LEFT JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smownerid LEFT JOIN vtiger_groups ON vtiger_groups.groupid = vtiger_crmentity.smownerid `;

    var conditionForContactId = ` WHERE vtiger_crmentity.deleted=0 AND vtiger_contactdetailsContacts.contactid=${contactid} `;
  } else if (module == 'Vendors') {

    var baseTable = 'vtiger_vendor';
    var query = `SELECT DISTINCT vtiger_crmentity.crmid,vtiger_vendor.vendorname, vtiger_vendor.email, vtiger_vendor.phone, vtiger_vendor.website, vtiger_vendor.category FROM vtiger_vendor INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid=vtiger_vendor.vendorid INNER JOIN vtiger_vendorcontactrel ON vtiger_vendorcontactrel.vendorid=vtiger_vendor.vendorid LEFT JOIN vtiger_vendorcf ON vtiger_vendorcf.vendorid=vtiger_vendor.vendorid LEFT JOIN vtiger_users ON vtiger_users.id=vtiger_crmentity.smownerid LEFT JOIN vtiger_groups ON vtiger_groups.groupid=vtiger_crmentity.smownerid `;

    var conditionForContactId = ` WHERE vtiger_crmentity.deleted=0 AND vtiger_vendorcontactrel.contactid=${contactid} `;
  } else {
    var moduleNameLowerCase = `${module.toLowerCase()}`;
    var baseTable = `vtiger_${moduleNameLowerCase}`;

    const related_sql = `SELECT vtiger_field.columnname FROM vtiger_relatedlists INNER JOIN vtiger_field ON vtiger_field.fieldid = vtiger_relatedlists.relationfieldid WHERE vtiger_relatedlists.tabid = 4 AND vtiger_field.tablename = 'vtiger_${moduleNameLowerCase}' AND vtiger_relatedlists.name= 'get_dependents_list' `;
    const related_row = await db.query(related_sql);
    const related_data = helper.emptyOrRows(related_row);
    const relatedColumn = related_data[0]['columnname'];
    if (relatedColumn == '') {
      return { error: 'related field missing' }
    }

    var query = `SELECT vtiger_crmentity.createdtime,vtiger_crmentity.modifiedtime,vtiger_crmentity.smownerid,vtiger_crmentity.setype,vtiger_crmentity.label as crmentity_label, vtiger_${moduleNameLowerCase}.*,vtiger_${moduleNameLowerCase}cf.* FROM vtiger_${moduleNameLowerCase} INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid = vtiger_${moduleNameLowerCase}.${moduleNameLowerCase}id LEFT JOIN vtiger_${moduleNameLowerCase}cf ON vtiger_${moduleNameLowerCase}cf.${moduleNameLowerCase}id = vtiger_${moduleNameLowerCase}.${moduleNameLowerCase}id INNER JOIN vtiger_contactdetails AS vtiger_contactdetailsContacts ON vtiger_contactdetailsContacts.contactid = vtiger_${moduleNameLowerCase}.${relatedColumn} LEFT JOIN vtiger_users ON vtiger_users.id = vtiger_crmentity.smownerid LEFT JOIN vtiger_groups ON vtiger_groups.groupid = vtiger_crmentity.smownerid `;

    var conditionForContactId = ` WHERE vtiger_crmentity.deleted = 0 AND vtiger_contactdetailsContacts.contactid = ${contactid} `;
  }


  var dynamicLeftJoinQuery = await helper.getDynamicLeftJoinQuery(baseTable);
  if (dynamicLeftJoinQuery != undefined && dynamicLeftJoinQuery != '') {
    query += ` ${dynamicLeftJoinQuery} `;
  }

  query += ` ${conditionForContactId}  `;

  var Ui10WhereCondition = await helper.getUi10WhereCondition(baseTable, searchParams);
  if (Ui10WhereCondition != undefined && Ui10WhereCondition != '') {
    query += ' AND ' + `(${Ui10WhereCondition})`;
  }

  var whereConditionQuery = await helper.getWhereCondition(module, searchParams);
  if (whereConditionQuery != undefined && whereConditionQuery != '') {
    query += ' AND ' + whereConditionQuery;
  }

  if (crmid != undefined && crmid) {
    query += ` AND vtiger_crmentity.crmid = ${crmid}`;
  }

  const offset = await helper.getOffset(page, config.listPerPage);
  query += ` ORDER BY vtiger_crmentity.modifiedtime DESC  `;

  const limitQuery = `${query} LIMIT ${offset}, ${config.listPerPage}`;

  //console.log(query);
  const formateQuery = mysql.format(limitQuery, []);
  const rows = await db.query(formateQuery);
  const results = await db.query(query);
  const numRows = results.length;
  const data = helper.emptyOrRows(rows);
  const numOfPages = Math.ceil(numRows / config.listPerPage);
  return {
    "success": true,
    result: data,
    total_records: numRows,
    total_pages: numOfPages,
    query: formateQuery
  }
  //return { formateQuery }
}

module.exports = {
  getMultiple
}