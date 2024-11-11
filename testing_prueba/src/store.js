import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './redux/usersSlice';
import postsReducer from './redux/postSlice'
import todosReducer from './redux/todoSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    todos: todosReducer
  },
});

