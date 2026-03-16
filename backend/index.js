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

    const { 
        title,
        description,
        start_time,
        end_time,
     } = req.body;

    if(!title){
        return res.status(400).send("Task title is required")
    }

    const sql = "INSERT INTO tasks (title, description, start_time, end_time) VALUES (?, ?, ?, ?)"

    pool.query(sql, [title, description, start_time, end_time], (err, result)  =>{
        if(err){
            console.error("DB ERROR", err);
            return res.status(500).send("There exist a database error where we are adding a taske")
        }

        res.json({
        id: result.insertId,
        title,
        description,
        start_time,
        end_time,
        
        completed: false
      })
        
    })

    
})

app.get("/tasks" , (req, res) => {
    
    const getQuery = `
      SELECT * FROM tasks
      ORDER BY id DESC
    `

    pool.query( getQuery, (err, result)  => {
        if(err){
            console.error("A getQuery error: ", err)
            return res.status(500).send("There exist a database error where ewe are retriuving a task")
        }
        res.json(result)
    })
})

app.get("/tasks/recents" , (req, res) => {
    
    const getQuery = `
      SELECT * FROM tasks
      ORDER BY id DESC
      LIMIT 5
    `

    pool.query( getQuery, (err, results)  => {
        if(err){
            return res.status(500).send("There exist a database error where ewe are retriuving a task")
        }
        res.json(results)
    })
})

{/* For marking task complete */}
app.put("/tasks/:id/complete", (req, res) =>{

    const { id } = req.params

    const sql = "UPDATE tasks SET completed = TRUE WHERE id ?"

    pool.query(sql, [id], (err) => {

        if(err){
            console.error(err)
            return res.status(500).send("Eror for updating the task")
        }

        res.send("Task Complete")
    })

})

{/* To Delete tasks */}
app.delete("/tasks/:id" , (req, res) => {
    const { id } = req.params

    const sql = "DELETE FROM tasks WEHRE id = ?"

    pool.query(sql, [id], err => {
        if(err){
            console.error(err)
            return res.status(500).send("Error deleting")
        }
        res.send("Task deleted")
    })
})

{/* To edit task */}
app.put("/taks/:id", (req, res) => {
    
    const { id } = req.params
    const {title, description} = req.body

    const sql = `
       UPDATE tasks
       SET title = ?, description = ?
       WHERE id = ?
    `

    pool.query(sql, [title, description, id], (err) => {
        if(err){
            console.error(err)
            return res.status(500).send("Error updating task")
        }

        res.send("Task upodated")
    })
})

app.listen(5000,() => {
    console.log("Server is listening to the port")
})
