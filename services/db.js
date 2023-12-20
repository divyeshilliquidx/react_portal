//v8_portal_api_nodejs\services\db.js
const mysql = require('mysql2/promise');
const config = require('../config');

// async function query(sql, params) {
//   const connection = await mysql.createConnection(config.db);
//   const [results, ] = await connection.execute(sql, params);

//   return results;
// }

// module.exports = {
//   query
// }

const pool = mysql.createPool(config.db);

async function query(sql, params) {
  const connection = await pool.getConnection();
  try {
    const [results,] = await connection.execute(sql, params);
    return results;
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

module.exports = {
  query,
};