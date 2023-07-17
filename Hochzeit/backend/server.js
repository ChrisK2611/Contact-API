import express from "express"
import cors from "cors"

import { addTodo, deleteToDo, todos, updateToDo } from "./model/ToDosModel.js";

const app = express();
const PORT = 3001;

app.use(express.json())
app.use(cors())

app.get('/api/todos', (req, res) => {
    console.log(todos);
    res.send(todos)
})

app.post('/api/todos', async (req, res) => {
    const todo = req.body
    const newToDo = await addTodo(todo)
    res.send(newToDo)
})

app.put('/api/todos/:id', async (req, res) => {
    const {id} = req.params
    const todo = req.body
    const updatedToDo = await updateToDo(id, todo)
    res.send(updatedToDo)
})

app.delete('/api/todos/:id', async (req, res) => {
    const {id} = req.params
    deleteToDo(id)
    res.send('wurde gelöscht')
})

app.listen(PORT, () => {console.log(`Server is running on Port: ${PORT}`);
})