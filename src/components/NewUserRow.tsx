// src/components/NewUserRow.tsx
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addUser } from '../features/usersSlice'
import { addLog } from '../features/logsSlice'
import { User } from '../types'
import { TableRow, TableCell, TextField, Button, MenuItem } from '@mui/material'
import { nanoid } from 'nanoid'
import DOMPurify from 'dompurify'

const roles: User['role'][] = ['Аналитик', 'Оператор', 'Администратор']
const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/

const NewUserRow = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<User['role']>('Аналитик')
  const [accessLevel, setAccessLevel] = useState(1)
  const [emailError, setEmailError] = useState('')

  const handleAdd = () => {
    const cleanName = DOMPurify.sanitize(name)

    if (!cleanName.trim() || !email.trim()) {
      alert('Пустые поля или введенные некорректные данные')
      return
    }

    if (!emailRegex.test(email)) {
      setEmailError('Некорректный email')
      return
    }

    const newUser: User = {
      id: nanoid(),
      name: cleanName,
      email,
      role,
      accessLevel
    }

    dispatch(addUser(newUser))
    dispatch(addLog({
      id: nanoid(),
      message: `Добавлен пользователь ${cleanName} (${email})`,
      timestamp: new Date().toLocaleString()
    }))

    setName('')
    setEmail('')
    setAccessLevel(1)
    setEmailError('')
  }

  return (
    <TableRow>
      <TableCell>
        <TextField size="small" value={name} onChange={e => setName(e.target.value)} />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={email}
          onChange={e => {
            setEmail(e.target.value.trim())
            if (emailError) setEmailError('')
          }}
          error={!!emailError}
          helperText={emailError}
        />
      </TableCell>
      <TableCell>
        <TextField select size="small" value={role} onChange={e => setRole(e.target.value as User['role'])}>
          {roles.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
        </TextField>
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          type="number"
          inputProps={{ min: 1, max: 5 }}
          value={accessLevel}
          onChange={e => setAccessLevel(Number(e.target.value))}
        />
      </TableCell>
      <TableCell>
        <Button onClick={handleAdd}>Добавить</Button>
      </TableCell>
    </TableRow>
  )
}

export default NewUserRow
