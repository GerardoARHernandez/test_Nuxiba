import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './redux/usersSlice';
import { setLoading, setTodos, setFailed } from './redux/todoSlice';

import User from './components/User';
import UserList from './components/UserList';

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);

  const [selectedUser, setSelectedUser] = useState(null);
  
  // Cargar usuarios al iniciar la aplicación
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  // Función para seleccionar un usuario y cargar su información
  const handleSelectUser = async (userId) => {
    setSelectedUser(users.find((user) => user.id === userId));

    // Cargar los todos del usuario
    dispatch(setLoading()); // Cambiar el estado a 'loading'

    try {
      const todosResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
      const todosData = await todosResponse.json();
      dispatch(setTodos(todosData)); // Actualiza el estado global con Redux
    } catch (error) {
      dispatch(setFailed()); // Si hay un error, cambia el estado a 'failed'
    }
  };

  return (
    <>
      <h1 className='text-center font-bold text-5xl my-3 py-10'>Lista de Usuarios</h1>

      <div className="mt-12 md:flex container mx-auto">
        <UserList  
          users={users}
          status={status}
          handleSelectUser={handleSelectUser}
        />
        
        <User 
          selectedUser={selectedUser}
        />

      </div>
    </>
  );
}


export default App;

