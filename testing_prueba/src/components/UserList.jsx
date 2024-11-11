
const UserList = ({status, handleSelectUser, users}) => {
  return (
    <>
      <div className='md:w-1/2 lg:w-2/5 mx-5 max-w-2xl bg-gray-300 shadow mb-10'>
      
        {status === 'loading' && 
          <p 
            className='from-lime-500 to-lime-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-sm font-bold'>
              Cargando usuarios...
          </p>
        }

        {status === 'succeeded' && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <button 
                  className='shadow-lg text-center font-bold p-2 border bg-indigo-400 text-white hover:bg-indigo-600 rounded-lg w-full text-xl'
                  onClick={() => handleSelectUser(user.id)}>
                  {user.id} - {user.name}
                </button>
              </li>
            ))}
          </ul>
        )}

        {status === 'failed' && 
          <p
          className='from-red-500 to-red-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-sm font-bold'>
            Error al cargar usuarios
          </p>
        }
      </div>
    
    </>
  )
}

export default UserList 