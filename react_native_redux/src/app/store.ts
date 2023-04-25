import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
// import userReducer from '../Redux/Reducers/User/userReducer'
import userReducer from '../features/counter/userSlice'
import productsReducer from '../features/counter/productSlice'

export const store = configureStore({
  reducer: {
    counter:counterReducer,
    user:userReducer,
    products:productsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch