import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('usersApp/users/getUsers',
  async ({
    page, limit, search, order, orderDirection,
  }, { dispatch }) => {
    const response = await axios.get('admin/users', {
      params: {
        page: page + 1,
        limit,
        search,
        order,
        orderDirection,
      },
    });

    dispatch(setTotalResults(response.data.total));
    return response.data.results;
  });

export const removeUser = createAsyncThunk('usersApp/users/removeUser',
  async ({
    user,
  }) => {
    const response = await axios.delete(`admin/users/${user._id}`);

    return user._id;
  });

export const removeUsers = createAsyncThunk('banksApp/banks/removeUsers',
  async ({
    users,
  }) => {
    const requests = [];
    for (let i = 0; i < users.length; i += 1) {
      const userId = users[i];
      requests.push(axios.delete(`admin/users/${userId}`));
    }
    await Promise.all(requests);

    return users;
  });

const usersAdapter = createEntityAdapter({
  selectId: (model) => model._id,
});

export const {
  selectAll: selectUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors(
  (state) => state.usersApp.users,
);

const usersSlice = createSlice({
  name: 'usersApp/users',
  initialState: usersAdapter.getInitialState({
    searchText: '',
    totalResults: 0,
    removeDialog: {
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setUsersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setTotalResults: {
      reducer: (state, action) => {
        state.totalResults = action.payload;
      },
      prepare: (totalResults) => ({ payload: totalResults || '' }),
    },
    openRemoveDialog: {
      reducer: (state, action) => {
        state.removeDialog = {
          props: {
            open: true,
          },
          data: {
            ...action.payload,
          },
        };
      },
      prepare: (data) => ({ payload: data }),
    },
    closeRemoveDialog: {
      reducer: (state, action) => {
        state.removeDialog = {
          props: {
            open: false,
          },
          data: null,
        };
      },
      prepare: () => ({ }),
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: usersAdapter.setAll,
    [removeUser.fulfilled]: usersAdapter.removeOne,
    [removeUsers.fulfilled]: usersAdapter.removeMany,
  },
});

export const {
  setUsersSearchText,
  openRemoveDialog,
  closeRemoveDialog,
  setTotalResults,
} = usersSlice.actions;

export default usersSlice.reducer;
