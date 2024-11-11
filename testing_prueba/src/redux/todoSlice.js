import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
  return response.json();
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle', 
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.status = 'succeeded'; // Cuando los todos se cargan con éxito
    },
    setLoading: (state) => {
      state.status = 'loading'; // Cuando comienza la carga de los todos
    },
    setFailed: (state) => {
      state.status = 'failed'; // Cuando falla la carga de los todos
    },
    sortTodosByIdDesc: (state) => {
      state.todos.sort((a, b) => b.id - a.id); // Ordena los todos por ID descendente
    },
  }
});

// Acciones
export const { setTodos, setLoading, setFailed, sortTodosByIdDesc } = todosSlice.actions;

// Reducer
export default todosSlice.reducer;

