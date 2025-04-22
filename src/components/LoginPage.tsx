import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/authSlice'
import { Container, TextField, Button, Typography, Box } from '@mui/material'

const LoginPage = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (username === 'admin' && password === '123456') {
      dispatch(login())
    } else {
      setError('Неверный логин или пароль')
    }
  }

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" gap={2} mt={10}>
        <Typography variant="h5">Вход в систему</Typography>
        <TextField label="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={handleLogin}>Войти</Button>
      </Box>
    </Container>
  )
}

export default LoginPage
