import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/usersSlice'
import logsReducer from '../features/logsSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    logs: logsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
