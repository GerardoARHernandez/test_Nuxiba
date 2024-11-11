const PostsList = ({ posts, postStatus }) => {
    if (postStatus === 'loading') {
      return <p className='from-lime-500 to-lime-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-sm font-bold'>
        Cargando posts...
      </p>;
    }
  
    if (postStatus === 'failed') {
      return <p className='from-red-500 to-red-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-sm font-bold'>
        Error al cargar los post
      </p>;
    }
  
    return (
      <>
        <h3 className='font-semibold text-2xl text-center uppercase py-3'>Posts</h3>

        <ul className="container mx-auto px-4 py-8 max-w-xl">
          {posts.map((post) => (
            <li className='pb-6' key={post.id}>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className='text-xl font-semibold mb-2 text-black'>{post.title}:</h4>
                <p className="text-gray-600">{post.body}</p>
                <h5 className='font-semibold text-lg m-2'>Comentarios:</h5>
                <ul>
                  {post.comments.map((comment) => (
                    <li key={comment.id} className='pl-4 text-base'>
                      <p className="text-gray-600">
                        <strong className="text-gray-700">
                          {comment.name}: {''}
                        </strong> 
                        {comment.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

      </>
    );
  };
  
  export default PostsList;
  