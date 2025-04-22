import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { deleteUser, User } from '../features/usersSlice'
import { addLog } from '../features/logsSlice'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import EditUserDialog from './EditUserDialog'

const UserList = () => {
  const users = useSelector((state: RootState) => state.users.users)
  const dispatch = useDispatch()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleDelete = (id: number) => {
    const user = users.find(u => u.id === id)
    if (user) {
      dispatch(deleteUser(id))
      const time = new Date().toLocaleTimeString()
      const date = new Date().toLocaleDateString()
      dispatch(addLog(`Admin удалил пользователя ${user.name} в ${time} ${date}`))
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Уровень доступа</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.accessLevel}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setSelectedUser(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <EditUserDialog
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  )
}

export default UserList
