const express = require('express')
const cors = require('cors')
const database = require('./db')
const pool = require('./db')
const app =  express()
const port = 5000

app.use( cors ({
    origin:"http://localhost:5173"
}))

app.use(express.json())
app.use(cors())


pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_time DATETIME,
    end_time DATETIME,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE
    )
`, (err) => {
    if(err) {
        console.log("Table creation error: ", err)
    } else {
        console.log("Table exists already")
    }
})
    
app.get("/" , (req, res) =>{
  res.send("APP has connected")
})

app.post("/tasks", (req, res) => {

    const { title } = req.body;

    if(!title){
        return res.status(400).send("Task title is required")
    }

    const sql = "INSERT INTO tasks (title, start_time, end_time, description) VALUES (?, ?, ?, ?)"

    pool.query(sql, [title, start_time, end_time, description], (err, result)  =>{
        if(err){
            console.error(err);
            return res.status(500).send("There exist a database error where we are adding a taske")
        }

        res.json({
        id: result.insertId,
        title,
        start_time,
        end_time,
        description,
        completed: false
      })
        
    })

    
})

app.get("/tasks" , (req, res) => {
    
    const getQuery = "SELECT * FROM tasks"

    pool.query( getQuery, (err, result)  => {
        if(err){
            console.error("A getQuery error: ", err)
            return res.status(500).send("There exist a database error where ewe are retriuving a task")
        }
        res.json(result)
    })
})

app.listen(5000,() => {
    console.log("Server is listening to the port");
})
