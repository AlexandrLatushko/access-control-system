import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Система управления доступом</Typography>
          <Button color="inherit" component={Link} to="/">Пользователи</Button>
          <Button color="inherit" component={Link} to="/logs">Логи</Button>
        </Toolbar>
      </AppBar>
      <div style={{ padding: 20 }}>{children}</div>
    </>
  )
}

export default Layout
