import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('usersApp/getUser', async (params) => {
  const response = await axios.get(`/admin/users/${params.userId}`);
  const { data } = response;

  return data;
});

export const saveUser = createAsyncThunk('users/saveUser', async (data, { dispatch }) => {
  if (data._id) {
    const response = await axios.patch(`/admin/users/${data._id}`, data);
    // dispatch(showMessage({ message: 'Badge Saved' }));
    return dispatch(getUser({ userId: response.data._id }));
  }
  const response = await axios.post('/admin/users/', data);
  return response.data;
});

const userSlice = createSlice({
  name: 'usersApp/user',
  initialState: null,
  reducers: {
    newUser: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          name: '',
          email: '',
          handle: '',
        },
      }),
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => action.payload,
    // [saveUser.fulfilled]: (state, action) => action.payload,
  },
});

export const { newUser } = userSlice.actions;

export default userSlice.reducer;
