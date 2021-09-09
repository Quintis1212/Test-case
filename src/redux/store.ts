import createSagaMiddleware from '@redux-saga/core';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import saga from './saga/saga';
import { counterSlice } from './slice'
// ...
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    data: counterSlice.reducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
})

sagaMiddleware.run(saga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch