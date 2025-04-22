import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { editUser, deleteUser } from '../features/usersSlice'
import { addLog } from '../features/logsSlice'
import { User } from '../types'
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Select, MenuItem, Button } from '@mui/material'
import DOMPurify from 'dompurify'
import { useState, useEffect } from 'react'

const UserList = () => {
  const users = useSelector((state: RootState) => state.users.users)
  const dispatch = useDispatch()

  // Локальный стейт для формы
  const [localUsers, setLocalUsers] = useState<User[]>([])

  // При загрузке или изменении users — обновляем локальный стейт
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
  
    if (!user.name.trim()) {
      alert('Имя не может быть пустым')
      return
    }
  
    if (user.accessLevel < 1 || user.accessLevel > 5) {
      alert('Уровень доступа должен быть от 1 до 5')
      return
    }
  
    // Собираем сообщения о изменениях
    const changes: string[] = []
  
    if (user.name !== originalUser.name) {
      changes.push(`имя пользователя с "${originalUser.name}" на "${user.name}"`)
    }
  
    if (user.role !== originalUser.role) {
      changes.push(`роль пользователя ${user.name} с "${originalUser.role}" на "${user.role}"`)
    }
  
    if (user.accessLevel !== originalUser.accessLevel) {
      changes.push(`уровень доступа пользователя ${user.name} с ${originalUser.accessLevel} на ${user.accessLevel}`)
    }
  
    if (changes.length > 0) {
      const logMessage = `Admin изменил ${changes.join(', ')} в ${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`
      dispatch(
        addLog({
          id: Date.now(),
          message: logMessage,
          timestamp: new Date().toLocaleString(),
        })
      )
    }
    // Обновляем пользователя
    dispatch(editUser(user))
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
              <Button onClick={() => handleSave(user)}>Сохранить</Button>
              <Button onClick={() => dispatch(deleteUser(user.id))}>Удалить</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UserList
