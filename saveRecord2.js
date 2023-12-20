const mysql = require('mysql');
const db = require('./db');
const helper = require('../helper');


async function getMultiple(columns, values) {
  try {
    const data = helper.saveRecordData(columns, values);
    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getMultiple
}