const express = require("express")
const cors = require("cors")
const pool = require("./db")


const app = express()


// MIDDLAWARES
app.use(cors())
app.use(express.json())

// ROUTES

// create a todo
app.post("/posttodo", async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        )
        res.status(200).json(newTodo.rows[0])

    } catch (err) {
        console.error(err)
    }
})
// get all todos 
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo ORDER BY id ASC"
        )
        res.status(200).json(allTodos.rows)
    } catch (err) {
        console.error(err)
    }
})
// get a todo 
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.param
        const todo = await pool.query(
            "SELECT * FROM todo WHERE id = $1",
            [id]
        )
        res.status(200).json(todo)
    } catch (err) {
        console.error(err)
    }
})
// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE id = $2",
            [description, id]
        )
        res.status(200).json({ message: "SUCSSES !" })
    } catch (error) {
        console.error(error)
    }
})
// delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE id = $1",
            [id]
        )
        res.status(200).json({ message: "SUCSSES !" })

    } catch (error) {
        console.error(error)
    }
})

let port = 3000
app.listen(port, () => {
    console.log("http://localhost:" + port)
})


