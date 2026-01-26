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

app.post("/tasks", async (req, res) => {
    const { title } = req.body;

    console.log("Task received:", title)

    db.run(
    "INSERT INTO tasks (title) VALUES (?)",
    [title],
    function (err) {
      if (err) return res.status(500).json(err)
      res.json({ id: this.lastID, title })
    }
  )
})

app.listen(5000,() => {
    console.log("Server is listening to the port");
})
