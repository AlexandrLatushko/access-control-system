import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editUser, User } from '../features/usersSlice'
import { addLog } from '../features/logsSlice'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem
} from '@mui/material'

const roles = ['Аналитик', 'Оператор', 'Администратор']

type Props = {
  user: User
  onClose: () => void
}

const EditUserDialog = ({ user, onClose }: Props) => {
  const dispatch = useDispatch()

  const [name, setName] = useState(user.name)
  const [role, setRole] = useState(user.role)
  const [accessLevel, setAccessLevel] = useState(user.accessLevel)
  const [errors, setErrors] = useState<{ name?: string, accessLevel?: string }>({})

  // Простая проверка имени на XSS и пустоту
  const validateName = (value: string) => {
    if (!value.trim()) return 'Имя не может быть пустым'
    if (/[<>]/.test(value) || /<script.*?>.*?<\/script>/gi.test(value)) {
      return 'Имя содержит недопустимые символы'
    }
    return ''
  }

  // Проверка уровня доступа от 1 до 5
  const validateAccessLevel = (value: number) => {
    if (value < 1 || value > 5) return 'Доступ должен быть от 1 до 5'
    return ''
  }

  const handleSave = () => {
    const nameError = validateName(name)
    const accessLevelError = validateAccessLevel(accessLevel)

    if (nameError || accessLevelError) {
      setErrors({ name: nameError, accessLevel: accessLevelError })
      return
    }

    dispatch(editUser({ ...user, name, role, accessLevel }))
    const time = new Date().toLocaleTimeString()
    const date = new Date().toLocaleDateString()
    dispatch(addLog(`Admin изменил пользователя ${name}: роль ${role}, доступ ${accessLevel} в ${time} ${date}`))
    onClose()
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Редактировать пользователя</DialogTitle>
      <DialogContent>
        <TextField
          label="Имя"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (errors.name) {
              setErrors({ ...errors, name: validateName(e.target.value) })
            }
          }}
          error={Boolean(errors.name)}
          helperText={errors.name}
          margin="normal"
        />

        <TextField
          label="Роль"
          select
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
          margin="normal"
        >
          {roles.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
        </TextField>

        <TextField
          label="Уровень доступа"
          type="number"
          fullWidth
          value={accessLevel}
          onChange={(e) => {
            setAccessLevel(Number(e.target.value))
            if (errors.accessLevel) {
              setErrors({ ...errors, accessLevel: validateAccessLevel(Number(e.target.value)) })
            }
          }}
          error={Boolean(errors.accessLevel)}
          helperText={errors.accessLevel}
          inputProps={{ min: 1, max: 5 }}
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave} variant="contained">Сохранить</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditUserDialog
