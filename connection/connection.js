const mysql = require('mysql')

// db connection
const db = mysql.createConnection({
    user: 'root',
    database: 'dimsum_ibukota',
    port: 3306
})

module.exports = db