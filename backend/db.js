const mysql = require('mysql/promise')
const { Database } = require('sqlite3')

const pool = mysql.createPool ({
    host: 'localhost',
    user: 'Proxima',
    password: '#Proxima@1',
    database: 'todolist'
})

module.exports = pool;