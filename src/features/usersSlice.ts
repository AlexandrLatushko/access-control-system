import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types'

interface UsersState {
  users: User[]
}

const initialState: UsersState = {
  users: [
    { id: 1, name: 'Иван', email: 'ivan@mail.ru', role: 'Аналитик', accessLevel: 3 },
    { id: 2, name: 'Петя', email: 'petr@mail.ru', role: 'Оператор', accessLevel: 2 },
  ],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    editUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(u => u.id !== action.payload)
    },
  },
})

export const { editUser, deleteUser } = usersSlice.actions
export default usersSlice.reducer
