import { Container, Button, Typography } from '@mui/material'
import UserList from './UserList'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import LogsList from './LogsList'

const MainApp = () => {
  const dispatch = useDispatch()

  return (
    <Container>
      <Typography variant="h4" mt={2}>Панель управления доступом</Typography>
      <Button variant="contained" color="secondary" onClick={() => dispatch(logout())} sx={{ mt: 2 }}>Выйти</Button>
      <UserList />
      <LogsList />
    </Container>
  )
}

export default MainApp
