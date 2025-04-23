import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/authSlice'
import { Container, TextField, Button, Typography, Box } from '@mui/material'

const LoginPage = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    if (username === 'admin' && password === '123456') {
      dispatch(login())
    } else {
      setError('Неверный логин или пароль')
    }
  }

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" gap={4} mt={14}>
        <Typography variant="h5">Вход в систему</Typography>
        <TextField label="Логин" value={username} onChange={handleUsernameChange} />
        <TextField label="Пароль" type="password" value={password} onChange={handlePasswordChange} />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={handleLogin}>Войти</Button>
      </Box>
    </Container>
  )
}

export default LoginPage
