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
  CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`)
    

app.post("/tasks", (req, res) => {

    const { title } = req.body;

    if(!task){
        return res.status(400).send("Task title is required")
    }

    console.log("The task title is ", title);

    const serverResponse = {
        message: `The server has proceeded with the response`,
        status: `success`
    }

    res.json(serverResponse)
})

app.listen(5000,() => {
    console.log("Server is listening to the port");
})
