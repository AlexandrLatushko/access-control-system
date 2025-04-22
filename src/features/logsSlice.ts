import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Log = string

type LogsState = {
  logs: Log[]
}

const initialState: LogsState = {
  logs: [],
}

export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<Log>) => {
      state.logs.unshift(action.payload)
    },
  },
})

export const { addLog } = logsSlice.actions
export default logsSlice.reducer
