import axios from 'axios'
import React, { useState } from 'react'
import { MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { setTodo } from '../app/features/todoSlice'


const Table = () => {

  const dispatch = useDispatch()

  const todos = useSelector(state => state.todos.todos)
  const isLoading = useSelector(state => state.todos.isLoading)

  const [editText, setEditText] = useState({
    'body': ''
  })

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://todoapp-backend-f0eh.onrender.com/api/todo/${id}/`)
      const newList = todos.filter(todo => todo.id !== id)
      dispatch(setTodo(newList))
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(`https://todoapp-backend-f0eh.onrender.com/api/todo/${id}/`, value)
      console.log(response.data);
      const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
      dispatch(setTodo(newTodos))
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setEditText(prev => ({
      ...prev,
      'body': e.target.value
    }))
    console.log(editText);
  }

  const handleClick = () => {
    handleEdit(editText.id, editText)
    setEditText({
      'body': ""
    })
  }

  const handleCheckbox = (id, value) => {
    console.log(value.completed);
    handleEdit(id, {
      'completed': !value
    })
  }


  return (
    <div>
      <table className='w-11/12 max-w-4xl'>
        <thead className='border-b-2 border-black'>
          <tr>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Checkbox</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>To Do</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date Created</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? <div>
            Loading...
          </div> :
            <> {todos.map((todoItem, index) =>
            (
              <tr key={todoItem.id} className='border-b border-black'>
                <td className='p-3'>
                  <span onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}
                    className='inline-block cursor-pointer'>{todoItem.completed === true ? <MdOutlineCheckBox /> :
                      <MdOutlineCheckBoxOutlineBlank />}
                  </span>
                </td>
                <td className='p-3 text-sm ' title={todoItem.id}>{todoItem.body}</td>
                <td className='p-3 text-sm text-center'>
                  <span className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todoItem.completed ? 'bg-green-300' : 'bg-red-300'}`}>
                    {todoItem.completed ? 'Done' : 'Incomplete'}
                  </span>
                </td>
                <td className='p-3 text-sm font-medium'>{new Date(todoItem.created).toLocaleString()}</td>
                <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5 '>
                  <span><label htmlFor="my-modal" ><MdEditNote onClick={() => setEditText(todoItem)} className=' text-xl cursor-pointer' /></label></span>
                  <span className=' text-xl cursor-pointer'><MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} /></span>

                </td>
              </tr>
            )
            )}</>}
        </tbody>
      </table>

      {/* Modal */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Todo</h3>
          <input type="text" value={editText.body} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full mt-8" />
          <div className="modal-action">
            <label htmlFor="my-modal" onClick={handleClick} className="btn btn-primary">Edit</label>
            <label htmlFor="my-modal" className="btn">Close</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table