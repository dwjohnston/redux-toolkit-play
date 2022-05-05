import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchAllUsers, fetchUser, deleteUser, createUser, updateUser } from '../../services/UserService';
import { User } from '../../types/User';
export interface UsersState {
  users: Array<User>;
  status: 'idle' | 'loading' | 'failed';
  loadingRows: Array<string>; 
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  loadingRows: [], 
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const asyncFetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  fetchAllUsers
);

export const asyncFetchUser = createAsyncThunk(
  'users/fetchUser',
  fetchUser
);

export const asyncCreateUser = createAsyncThunk(
  'users/createUser',
  createUser
);

export const asyncDeleteUser = createAsyncThunk(
  'users/deleteUser',
  deleteUser, 
);

export const asyncUpdateUser = createAsyncThunk(
  'users/updateUser',
  updateUser
);



export const counterSlice = createSlice({
  name: 'users',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncFetchAllUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      }).addCase(asyncCreateUser.fulfilled, (state, action) => {

        console.log(state);
        state.users = [...state.users, action.payload]
      })
      .addCase(asyncDeleteUser.pending, (state, action) => {
        state.loadingRows.push(action.meta.arg.id); 
      })
      .addCase(asyncDeleteUser.fulfilled, (state, action) => {
        state.users =  state.users.filter((v) => v.id !== action.meta.arg.id); 
        state.loadingRows = state.loadingRows.filter ((v) => v !== action.meta.arg.id)
      }).addCase(asyncUpdateUser.fulfilled, (state, action) => {
        state.users = state.users.map((v) => {
            if (v.id === action.payload.id) {
              return action.payload; 
            }
            return v; 
        })
      })
      
      

  }
});


export const selectUsersStatus = (state: RootState) => {
  return {
    isLoading: state.users.status === "loading",
    users: state.users.users,
    loadingRows: state.users.loadingRows, 
  }
}

export default counterSlice.reducer;
