import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle', // 'idle' cuando no se está cargando, 'loading' cuando se están cargando, 'succeeded' o 'failed' según el resultado
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
