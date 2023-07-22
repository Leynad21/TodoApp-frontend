import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    todos: [],
    isLoading: true
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodo(state, action) {
            state.todos = (action.payload)
        },
        updateLoading(state, action) {
            state.isLoading = action.payload
        }

    }
})



export const { setTodo, updateLoading } = todoSlice.actions

export default todoSlice.reducer