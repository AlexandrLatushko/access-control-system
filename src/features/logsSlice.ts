import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Log } from '../types'

interface LogsState {
  logs: Log[]
}

const initialState: LogsState = {
  logs: [],
}

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<Log>) => {
      state.logs.push(action.payload)
    },
  },
})

export const { addLog } = logsSlice.actions
export default logsSlice.reducer
