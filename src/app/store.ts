import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/usersSlice'
import logsReducer from '../features/logsSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    logs: logsReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
