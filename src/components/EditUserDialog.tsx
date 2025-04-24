import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLog } from '../features/logsSlice'
import { User } from '../types'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem
} from '@mui/material'
import DOMPurify from 'dompurify'
import { nanoid } from 'nanoid'
import { updateUser } from '../features/usersSlice'
import { getUserChanges, isAccessLevelValid, isNameValid, createLogMessage } from '../utils/userUtils'

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

  const handleSave = () => {
    const cleanName = DOMPurify.sanitize(name)

    const nameError = isNameValid(cleanName) ? '' : 'Имя не может быть пустым'
    const accessLevelError = isAccessLevelValid(accessLevel) ? '' : 'Доступ должен быть от 1 до 5'

    if (nameError || accessLevelError) {
      setErrors({ name: nameError, accessLevel: accessLevelError })
      return
    }

    const updatedUser = { ...user, name: cleanName, role, accessLevel }
    dispatch(updateUser(updatedUser))

    const changes = getUserChanges(user, updatedUser)
    if (changes.length > 0) {
      dispatch(addLog({
        id: nanoid(),
        message: createLogMessage(changes),
        timestamp: new Date().toLocaleString()
      }))
    }

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
              setErrors({ ...errors, name: '' })
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
          onChange={(e) => setRole(e.target.value as User['role'])}
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
            const value = Number(e.target.value)
            setAccessLevel(value)
            if (errors.accessLevel) {
              setErrors({ ...errors, accessLevel: '' })
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
