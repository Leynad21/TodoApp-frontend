import { useState, useEffect, useContext } from 'react'
import './App.css'
import Table from './components/Table'
import TodoForm from './components/TodoForm'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setTodo, updateLoading } from "./app/features/todoSlice"



function App() {


  const dispatch = useDispatch()



  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://todoapp-backend-f0eh.onrender.com/api/todo');
      dispatch(setTodo(response.data))
      dispatch(updateLoading(false))
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className=' px-8 bg-indigo-100 min-h-screen '>
      <nav className='pt-8' >
        <h1 className=' text-5xl text-center pb-8'>To Do List </h1>
      </nav>
      {/* Body */}
      <TodoForm
        fetchData={fetchData}
      />
      <Table />
    </div>
  )
}

export default App
