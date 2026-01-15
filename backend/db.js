const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./todo.db')

db.serialize(() => {
    db.run(`
        
        CREATE TABLE IF NOT EXISTS task(
           id INTEGER PRODUCT KEY AUTOINCREMENT,
           title TEXT,
           completed INTEGER
        )
    `)

})

module.exports = db