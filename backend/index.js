const express = require('express')
const cors = require('cors')

const app =  express()
const port = 5000

app.use( cors ({
    origin:"http://localhost:5173"
}))

app.use(express.json())

app.get("/", (req, res) => {

    res.send("Server is running");
})

app.post("/tasks", async (req, res) => {
    const { title } = req.body;
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
