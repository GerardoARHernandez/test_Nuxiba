import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { sortTodosByIdDesc } from "../redux/todoSlice";

const User = ({ selectedUser, posts, postStatus, todosStatus, todos, handleFetchPosts }) => {
  
    const [showPost, setShowPost] = useState(false);
    const [showTodos, setShowTodos] = useState(false);
    const dispatch = useDispatch();

    useEffect( () =>{
        setShowPost(false)
        setShowTodos(false)
    }, [selectedUser]);

    const handleShowPost = () => {
        if (!showPost) {
          handleFetchPosts(selectedUser.id);
        }
        return setShowPost(!showPost); 
    }

    const handleShowTodos = () => {
        if (!showTodos) {
            dispatch(sortTodosByIdDesc());
        }
        return setShowTodos(!showTodos); 
    }

    return (
    <>
        <div className='md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll mx-5 max-w-3xl bg-gray-200 shadow-md py-5'>
            {selectedUser && (
                <div className=' max-w-lg mx-auto'>

                    <h2 className='font-semibold text-3xl text-center mb-3'>Detalles de {''}
                        <strong className='text-indigo-600'>{selectedUser.name}</strong>
                    </h2>

                    <p className='text-lg font-semibold m-2'>
                        <strong className='text-xl text-indigo-600'>Username:</strong> {''}
                        {selectedUser.username}
                    </p>

                    <p className='text-lg font-semibold m-2'>
                        <strong className='text-xl text-indigo-600'>Email:</strong> {''}
                        {selectedUser.email}
                    </p>

                    <p className='text-lg font-semibold m-2'>
                        <strong className='text-xl text-indigo-600'>Dirección:</strong> {''}
                        {selectedUser.address.street}, {selectedUser.address.city}
                    </p>

                    <p className='text-lg font-semibold m-2'>
                        <strong className='text-xl text-indigo-600'>Teléfono:</strong> {''} {selectedUser.phone}
                    </p>

                    <p className='text-lg font-semibold m-2'>
                        <strong className='text-xl text-indigo-600'>Website:</strong> {''} {selectedUser.website}
                    </p>

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

                    <div className={showPost ? 'max-w-lg mx-3 bg-gray-200 shadow-md py-5' : 'hidden'}>
                        <h3 className='font-semibold text-2xl text-center uppercase py-3'>Posts</h3>
                            
                            {postStatus === 'loading' && 
                            <p className='from-lime-500 to-lime-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-sm font-bold'>
                                Cargando posts...
                            </p>}
                            
                            {postStatus === 'succeeded' && (
                                <ul className="container mx-auto px-4 py-8 max-w-md">
                                    {posts.map((post) => (
                                        <li className='pb-6' key={post.id}>
                                            <div className="bg-white rounded-lg p-6 shadow-md">
                                                <h4 className='text-xl font-semibold mb-2 text-black'>{post.title}:</h4>

                                                <p className="text-gray-600">{post.body}</p>
                                            
                                                <h5 className='font-semibold text-lg m-2'>Comentarios:</h5>
                                                <ul>
                                                    {post.comments.map((comment) => (
                                                    <li key={comment.id} className='pl-4 text-sm'>
                                                        <p className="text-gray-600"><strong className="text-gray-700">{comment.name}:</strong> {comment.body}</p>
                                                    </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {postStatus === 'failed' && 
                                <p
                                    className='from-red-500 to-red-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-sm font-bold'>
                                    Error al cargar los post
                                </p>
                            }
                    </div>

                    <div className={showTodos ? 'max-w-lg mx-3 bg-gray-200 shadow-md py-5' : 'hidden'}>
                        {todosStatus === 'loading' && 
                            <p className='from-lime-500 to-lime-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-sm font-bold'>
                                Cargando todos...
                            </p>
                        }
                        {todosStatus === 'succeeded' && (
                            <ul className="container mx-auto px-4 py-8 max-w-md">
                                {todos.map((todo) => (
                                <li className='pb-3' key={todo.id}>
                                    <div className="bg-white rounded-lg p-8 shadow-md">
                                        <p className="text-lg">
                                            {todo.id} - {todo.title} - {''}
                                            <strong className={`font-bold ${todo.completed ? 'text-green-700' : 'text-red-500'}`}> 
                                                {todo.completed ? 'Completado' : 'Pendiente'}
                                            </strong>
                                        </p>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        )}
                        {todosStatus === 'failed' && 
                            <p className='from-red-500 to-red-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-sm font-bold'>
                                Error al cargar los todos.
                            </p>
                        }
                    </div>
                </div>
            )}
        </div>
    </>
  )
}

export default User