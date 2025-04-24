import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from '@mui/material'
import NewUserRow from './NewUserRow'
import UserRow from './UserRow'

const UserList = () => {
  const users = useSelector((state: RootState) => state.users)

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
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
          <NewUserRow />
          {users.map(user => <UserRow key={user.id} user={user} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserList