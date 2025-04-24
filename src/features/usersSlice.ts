import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types'
import { nanoid } from 'nanoid'

const initialState: User[] = [
  {
    id: nanoid(),
    name: 'Иван Иванов',
    email: 'ivanov@example.com',
    role: 'Оператор',
    accessLevel: 2
  },
  {
    id: nanoid(),
    name: 'Мария Петрова',
    email: 'petrova@example.com',
    role: 'Аналитик',
    accessLevel: 3
  }
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.unshift(action.payload)
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.findIndex(u => u.id === action.payload.id)
      if (index !== -1) state[index] = action.payload
    },
    deleteUser(state, action: PayloadAction<string>) {
      return state.filter(user => user.id !== action.payload)
    }
  }
})

export const { addUser, updateUser, deleteUser } = usersSlice.actions
export default usersSlice.reducer
