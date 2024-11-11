const TodosList = ({ todos, todosStatus }) => {
    if (todosStatus === 'loading') {
      return <p className='from-lime-500 to-lime-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-sm font-bold'>
        Cargando todos...
      </p>;
    }
  
    if (todosStatus === 'failed') {
      return <p className='from-red-500 to-red-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-sm font-bold'>
        Error al cargar los todos.
      </p>;
    }
  
    return (
      <>
        <h3 className='font-semibold text-2xl text-center uppercase py-3'>Todos</h3>

        <ul className="container mx-auto px-4 py-8 max-w-xl">
          {todos.map((todo) => (
            <li className='pb-3' key={todo.id}>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <p className="text-lg">
                  {todo.id} - {todo.title} - <strong className={`font-bold ${todo.completed ? 'text-green-700' : 'text-yellow-500'}`}>{todo.completed ? 'Completado' : 'Pendiente'}</strong>
                </p>
              </div>
            </li>
          ))}
        </ul>

      </>
    );

  };
  
  export default TodosList;
  