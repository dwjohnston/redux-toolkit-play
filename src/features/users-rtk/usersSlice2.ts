import { ActionReducerMapBuilder, CaseReducer, createAsyncThunk, createSlice, isFulfilled, PayloadAction, StateFromReducersMapObject } from '@reduxjs/toolkit';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
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



type SliceConfig<TState, TActionName extends string, TInput, TOutput> = {
  actionName: TActionName;
  asyncFn: (input: TInput) => Promise<TOutput>;
  fulfilled?: (state: TState, action: PayloadAction<TOutput, TActionName, TInput>) => void;
  pending?: (state: TState, action: PayloadAction<TOutput, TActionName, TInput>) => void;

  // And could do all the others. 
}


function davidsCreateSlice<TState>(name: string, initialState: TState, sliceConfigs: Array<SliceConfig<TState, any, any, any>>) {




  const thunks = sliceConfigs.map((v) => {
    const thunk = createAsyncThunk(v.actionName, v.asyncFn);
    return thunk;
  })

  const slice = createSlice({
    name,
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

    },
    extraReducers: (builder) => {



      let _builder = builder; 
      sliceConfigs.forEach((config,i) => {


        const thunk = thunks[i]; 
        if (config.fulfilled) {
          //@ts-ignore
          _builder = _builder.addCase(thunk.fulfilled, config.fulfilled);
        }
        if (config.pending) {
          //@ts-ignore
          _builder = _builder.addCase(thunk.pending, config.pending)
        }
      });

    }
  });

  //@ts-ignore
  return { slice, thunks };

};

// Unfortunately, I've lost the typings here. 
const { slice, thunks: _thunks } = davidsCreateSlice("user2", initialState, [
  {
    actionName: "user2/fetchAllUsers",
    asyncFn: fetchAllUsers,
    pending: (state, action) => {
      state.status = "loading"
    },
    fulfilled: (state, action) => {
      state.status="idle"
      state.users = action.payload;
    }
  },
  {
    actionName: "user2/createUser",
    asyncFn: createUser,

    fulfilled: (state, action) => {
      state.users = [...state.users, action.payload];
    }
  },
  {
    actionName: "user2/updateUser",
    asyncFn: createUser,

    fulfilled: (state, action) => {
      state.users = [...state.users.filter((v) => v.id !== action.meta.arg.id), action.payload];

      return state; 
    }
  },
  {
    actionName: "user2/deleteUser",
    asyncFn: createUser,

    pending: (state, action) => {
      state.loadingRows.push(action.meta.arg.id);

      return state; 

    },
    fulfilled: (state, action) => {

      state.users = state.users.filter((v) => v.id !== action.meta.arg.id);
      state.loadingRows = state.loadingRows.filter((v) => v !== action.meta.arg.id)

      return state; 

    }
  },
])


export const selectUsersStatus = (state: RootState) => {
  return {
    isLoading: state.users2.status === "loading",
    users: state.users2.users,
    loadingRows: state.users2.loadingRows,
  }
}

export const thunks = _thunks;

export default slice.reducer;
