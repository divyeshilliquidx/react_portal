const session = require('express-session');
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(contactid) {
  
  const result = { 'success': true, 'message': 'Logout Successfully' };
  return result;
}

module.exports = {
  getMultiple
}