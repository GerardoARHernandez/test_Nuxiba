const UserDetails = ({ selectedUser }) => {
    return (
      <>
        <h2 className='font-semibold text-3xl text-center mb-3'>
          Detalles de <strong className='text-indigo-600'>{selectedUser.name}</strong>
        </h2>
        <p className='text-lg font-semibold m-2'>
          <strong className='text-xl text-indigo-600'>Username:</strong> {selectedUser.username}
        </p>
        <p className='text-lg font-semibold m-2'>
          <strong className='text-xl text-indigo-600'>Email:</strong> {selectedUser.email}
        </p>
        <p className='text-lg font-semibold m-2'>
          <strong className='text-xl text-indigo-600'>Dirección:</strong> {selectedUser.address.street}, {selectedUser.address.city}
        </p>
        <p className='text-lg font-semibold m-2'>
          <strong className='text-xl text-indigo-600'>Teléfono:</strong> {selectedUser.phone}
        </p>
        <p className='text-lg font-semibold m-2'>
          <strong className='text-xl text-indigo-600'>Website:</strong> {selectedUser.website}
        </p>
      </>
    );
  };
  
  export default UserDetails;
  