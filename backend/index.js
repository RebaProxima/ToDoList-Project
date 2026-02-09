const express = require('express')
const cors = require('cors')
const database = require('./db')
const app =  express()
const port = 5000

app.use( cors ({
    origin:"http://localhost:5173"
}))

app.use(express.json())

pool.connect( err => {
    if(err){
        console.log("There is a connection error ")
        return;
    }
    console.log("Connected to the sql database")
})

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
