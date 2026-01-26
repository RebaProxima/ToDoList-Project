const express = require('express')
const cors = require('cors')
const { Pool } = require("pg")
const app =  express()

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todoapp",
    password: "Complicated",
    port: 5432,
})

app.use( cors ({
    origin:"http://localhost:5173"
}))

app.use(express.json())

app.get("/", (req, res) => {

    res.send("Server is running");
})

app.post("/tasks", async (req, res) => {
    const { title } = req.body;

    console.log("Task received:", title)

    const result = await pool.query(
        "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
        [title]
    )

    res.json(result.rows[0])
})

app.listen(5000,() => {
    console.log("Server is listening to the port");
})
