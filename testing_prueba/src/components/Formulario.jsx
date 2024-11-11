import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addTodo } from '../redux/todoSlice';

const Formulario = ({ selectedUser }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoCompleted, setNewTodoCompleted] = useState(false);
  const [savedTodo, setSavedTodo] = useState(null); // Estado para almacenar el todo guardado
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      userId: selectedUser.id,
      title: newTodoTitle,
      completed: newTodoCompleted,
    };

    dispatch(addTodo(newTodo));
    setSavedTodo(newTodo); // Almacena el nuevo todo en el estado
    setNewTodoTitle('');
    setNewTodoCompleted(false);
  };

  return (
    <>
      <form onSubmit={handleAddTodo} className="mb-4 p-10">
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={newTodoCompleted}
            onChange={(e) => setNewTodoCompleted(e.target.checked)}
            className="mr-2"
          />
          <label>Completado</label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full"
        >
          Guardar Tarea
        </button>
      </form>

      {savedTodo && (
        <div className="bg-white rounded-lg p-8 shadow-md mt-4">
          <p className="text-lg">
            Nueva Tarea: {savedTodo.title} - <strong className={`font-bold ${savedTodo.completed ? 'text-green-700' : 'text-red-500'}`}>
              {savedTodo.completed ? 'Completado' : 'Pendiente'}
            </strong>
          </p>
        </div>
      )}
    </>
  );
};

export default Formulario;
