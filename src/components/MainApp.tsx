import { Container, Button, Typography, Box } from '@mui/material'
import UserList from './UserList'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import LogsList from './LogsList'

const MainApp = () => {
  const dispatch = useDispatch()

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={4}>
        <Typography variant="h4">Панель управления доступом</Typography>
        <Button variant="outlined" color="info" onClick={() => dispatch(logout())}>
          Выйти
        </Button>
      </Box>
      <UserList />
      <LogsList />
    </Container>
  )
}

export default MainApp
