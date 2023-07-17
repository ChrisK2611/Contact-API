import fs from "node:fs/promises"
import {v4 as uuid} from "uuid"

const file_Path = './data/todos.json'

export let todos = [];

const _setUp = async () => {
    try {
        const buffer = await fs.readFile(file_Path)
        todos = JSON.parse(buffer)
    } catch (error) {
        console.log('Error reading from file', error);
    }
}
_setUp()

const _saveTodo = async () => {
    try {
        await fs.writeFile(file_Path, JSON.stringify(todos))
    } catch (error) {
        console.log('Error saving todos to file', error);
    }
}

export const addTodo = async (todo) => {
    const newToDo = {...todo, id:uuid()}
    todos.push(newToDo)
    await _saveTodo()
    return newToDo;
}

const _findEntryIndex = (id) => {
    return todos.findIndex((todo) => todo.id === id)
}

export const updateToDo = async (id, todo) => {
    const toDoIndex = _findEntryIndex(id)
    if(toDoIndex != -1){
        const updatedToDo = {...todos[toDoIndex], ...todo}
        todos[toDoIndex] = updatedToDo
        await _saveTodo()
        return updatedToDo;
    }
    return null
}

export const deleteToDo = async (id) => {
    const toDoIndex = _findEntryIndex(id)
    if (toDoIndex !== -1) {
        todos.splice(toDoIndex, 1)
        await _saveTodo()
        return true
    }
    return false 
}