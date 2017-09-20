const mysql = require('mysql');

exports.pool = mysql.createPool({
  connectionLimit: 20,
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'luyuan'
});

// exports.pool = mysql.createPool(database);
