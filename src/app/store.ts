import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from "../features/users-rtk/usersSlice";
import users2Reducer from "../features/users-rtk/usersSlice2";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer, 
    users2: users2Reducer, 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
