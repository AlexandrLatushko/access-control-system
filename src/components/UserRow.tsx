import { useState } from 'react'
import { TableRow, TableCell, Button } from '@mui/material'
import { User } from '../types'
import EditUserDialog from './EditUserDialog'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../features/usersSlice'
import { addLog } from '../features/logsSlice'
import { nanoid } from 'nanoid'

type Props = {
  user: User
}

const UserRow = ({ user }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteUser(user.id))
    dispatch(addLog({
      id: nanoid(),
      message: `Admin удалил пользователя ${user.name}`,
      timestamp: new Date().toLocaleString()
    }))
  }

  return (
    <>
      <TableRow>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.accessLevel}</TableCell>
        <TableCell>
          <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
          <Button color="error" onClick={handleDelete}>Удалить</Button>
        </TableCell>
      </TableRow>

      {isEditing && (
        <EditUserDialog user={user} onClose={() => setIsEditing(false)} />
      )}
    </>
  )
}

export default UserRow
