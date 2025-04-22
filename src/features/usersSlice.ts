import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = {
  id: number
  name: string
  email: string
  role: string
  accessLevel: number
}

type UsersState = {
  users: User[]
}

const initialState: UsersState = {
  users: [
    { id: 1, name: 'Иванов Иван', email: 'ivanov@mail.ru', role: 'Оператор', accessLevel: 3 },
    { id: 2, name: 'Петров Петр', email: 'petrov@mail.ru', role: 'Аналитик', accessLevel: 2 },
  ],
}

export const usersSlice = createSlice({
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
export type { User }
