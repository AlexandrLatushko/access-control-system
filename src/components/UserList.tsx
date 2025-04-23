import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { editUser, deleteUser } from '../features/usersSlice'
import { addLog } from '../features/logsSlice'
import { User } from '../types'
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Select, MenuItem, Button } from '@mui/material'
import DOMPurify from 'dompurify'
import { useState, useEffect } from 'react'
import {
  getUserChanges,
  isAccessLevelValid,
  isNameValid,
  createLogMessage
} from '../utils/userUtils'

const UserList = () => {
  const users = useSelector((state: RootState) => state.users.users)
  const dispatch = useDispatch()
  const [localUsers, setLocalUsers] = useState<User[]>([])

  useEffect(() => {
    setLocalUsers(users)
  }, [users])

  const handleLocalChange = (id: number, field: keyof User, value: string | number) => {
    setLocalUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, [field]: field === 'name' ? DOMPurify.sanitize(value.toString()) : value }
          : user
      )
    )
  }

  const handleSave = (user: User) => {
    const originalUser = users.find(u => u.id === user.id)
    if (!originalUser) return

    if (!isNameValid(user.name)) {
      alert('Имя не может быть пустым')
      return
    }

    if (!isAccessLevelValid(user.accessLevel)) {
      alert('Уровень доступа должен быть от 1 до 5')
      return
    }

    const changes = getUserChanges(originalUser, user)

    if (changes.length > 0) {
      const logMessage = createLogMessage(changes)
      dispatch(
        addLog({
          id: Date.now(),
          message: logMessage,
          timestamp: new Date().toLocaleString(),
        })
      )
    }

    dispatch(editUser(user))
  }

  const handleDelete = (user: User) => {
    const logMessage = `Admin удалил пользователя "${user.name}" (${user.email}) в ${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`

    dispatch(deleteUser(user.id))
    dispatch(
      addLog({
        id: Date.now(),
        message: logMessage,
        timestamp: new Date().toLocaleString(),
      })
    )
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Имя</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Роль</TableCell>
          <TableCell>Уровень доступа</TableCell>
          <TableCell>Действия</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {localUsers.map(user => (
          <TableRow key={user.id}>
            <TableCell>
              <TextField
                value={user.name}
                onChange={e => handleLocalChange(user.id, 'name', e.target.value)}
              />
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Select
                value={user.role}
                onChange={e => handleLocalChange(user.id, 'role', e.target.value)}
              >
                <MenuItem value="Аналитик">Аналитик</MenuItem>
                <MenuItem value="Оператор">Оператор</MenuItem>
                <MenuItem value="Администратор">Администратор</MenuItem>
              </Select>
            </TableCell>
            <TableCell>
              <TextField
                type="number"
                value={user.accessLevel}
                onChange={e => handleLocalChange(user.id, 'accessLevel', Number(e.target.value))}
              />
            </TableCell>
            <TableCell>
              <Button color="success" onClick={() => handleSave(user)}>Сохранить</Button>
              <Button color="error" onClick={() => handleDelete(user)}>Удалить</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UserList
