import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'

const Logs = () => {
  const logs = useSelector((state: RootState) => state.logs.logs)

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6">Логи действий</Typography>
      <List>
        {logs.map((log, index) => (
          <ListItem key={index}>
            <ListItemText primary={log} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default Logs
