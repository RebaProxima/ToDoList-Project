const express = require('express')
const cors = require('cors')
const app =  express()

app.use( cors ({
    origin:"http://localhost:5173"
}))

app.use(express.json())

app.get("/", (req, res) => {

    res.send("Server is running");
})

app.post("/tasks", (req, res) => {
    const { title } = req.body;

    console.log("Task received:", title)

    res.json( {message:"Task has been added", task:title} )
})

app.listen(5000,() => {
    console.log("Server is listening to the port");
})
