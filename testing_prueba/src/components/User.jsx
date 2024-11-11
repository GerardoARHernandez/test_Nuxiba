import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { sortTodosByIdDesc, addTodo } from "../redux/todoSlice";
import { fetchPostsWithComments } from '../redux/postSlice';


import UserDetails from "./UserDetails";
import PostsList from "./PostsList";
import TodosList from "./TodosList";

const User = ({ selectedUser}) => {
  const [showPost, setShowPost] = useState(false);
  const [showTodos, setShowTodos] = useState(false);

  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);

  const todos = useSelector((state) => state.todos.todos);
  const todosStatus = useSelector((state) => state.todos.status);

  const dispatch = useDispatch();

  const handleFetchPosts = (userId) => {
    dispatch(fetchPostsWithComments(userId));
  };
  
  useEffect(() => {
    setShowPost(false);
    setShowTodos(false);
  }, [selectedUser]);

  const handleShowPost = () => {
    if (!showPost) {
      handleFetchPosts(selectedUser.id);
    }
    setShowPost(!showPost);
  };

  const handleShowTodos = () => {
    if (!showTodos) {
      dispatch(sortTodosByIdDesc());
    }
    setShowTodos(!showTodos);
  };


  return (
    <div className='md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll mx-5 max-w-xl bg-gray-200 shadow-md py-5'>
      {selectedUser && (
        <div className='max-w-lg mx-auto'>
          <UserDetails
            selectedUser={selectedUser}
          />

          <div className='py-3'>
            <button
              className='shadow-lg text-center font-bold p-2 border bg-indigo-400 text-white hover:bg-indigo-600 rounded-lg w-full text-lg md:w-1/2'
              onClick={handleShowPost}>
              {showPost ? 'Ocultar Posts' : 'Ver Posts'}
            </button>

            <button
              className='shadow-lg text-center font-bold p-2 border bg-indigo-400 text-white hover:bg-indigo-600 rounded-lg w-full text-lg md:w-1/2'
              onClick={handleShowTodos}>
              {showTodos ? 'Ocultar Todos' : 'Ver Todos'}
            </button>
          </div>

          <div className={showPost ? 'max-w-lg -mx-5 bg-gray-200 shadow-md py-5' : 'hidden'}>
            <PostsList
                posts={posts}
                postStatus={postStatus} 
            />
          </div>

          <div className={showTodos ? 'max-w-lg -mx-5 bg-gray-200 shadow-md py-5' : 'hidden'}>
            <TodosList
                todos={todos}
                todosStatus={todosStatus}
                addTodo={addTodo}
                selectedUser={selectedUser}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
