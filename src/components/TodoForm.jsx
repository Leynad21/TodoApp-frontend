import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'


const TodoForm = ({ fetchData }) => {

    const todos = useSelector(state => state.todos.todos)
    const dispatch = useDispatch()

    const [newTodo, setNewTodo] = useState({
        'body': ''
    })

    const handleChange = (e) => {
        setNewTodo(prev => ({
            ...prev,
            'body': e.target.value
        }))
    }

    const postTodo = async () => {
        try {
            await axios.post(`https://todoapp-backend-f0eh.onrender.com/api/todo/`, newTodo)
            setNewTodo({ 'body': '' })
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         postTodo();
    //     }
    // }



    return (
        <>
            <input type="text" placeholder="Add Todo" value={newTodo.body}
                className="input input-bordered input-info w-full max-w-xs"
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        postTodo();
                    }
                }} />
            <button onClick={postTodo} className="btn btn-primary ml-2">Add todo</button>
        </>
    )
}

export default TodoForm