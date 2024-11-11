import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPostsWithComments = createAsyncThunk('posts/fetchPostsWithComments', async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
  const postsData = await response.json();

  const postsWithComments = await Promise.all(
    postsData.map(async (post) => {
      const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
      const commentsData = await commentsResponse.json();
      return { ...post, comments: commentsData };
    })
  );

  return postsWithComments;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsWithComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostsWithComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPostsWithComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
