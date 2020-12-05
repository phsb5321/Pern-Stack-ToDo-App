import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from "./EditTodo"

const ListTodos = () => {
    const [todos, setTodos] = useState([])

    const deleteTodos = async (id) => {
        try {
            await fetch(
                `http://localhost:3000/todos/${id}`,
                { method: "DELETE" }
            )
            setTodos(todos.filter(todo => todo.id !== id))
        } catch (error) {
            console.error(error.message)

        }
    }

    const getTodos = async () => {
        try {
            const reponse = await fetch(
                "http://localhost:3000/todos",
            )
            const jsonData = await reponse.json()
            setTodos(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <Fragment>
            <div className="container mt-5">
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.description}</td>
                                <td>
                                    <EditTodo todo={todo} />
                                </td>
                                <td><i
                                    className="fas fa-trash"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => deleteTodos(todo.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default ListTodos;