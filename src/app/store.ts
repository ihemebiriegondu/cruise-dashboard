import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "./ordersSlice";

//import and add ordersSlice to the store
//the store uses the slice reducer function to handle all update to the state

export const store = configureStore({
  reducer: {
    ordersReducer: ordersSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
