import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Typography, List, ListItem } from '@mui/material'

const LogsList = () => {
  const logs = useSelector((state: RootState) => state.logs.logs)

  return (
    <>
      <Typography variant="h5" mt={10}>Логи действий</Typography>
      <List>
        {logs.map(log => (
          <ListItem key={log.id}>{log.timestamp} — {log.message}</ListItem>
        ))}
      </List>
    </>
  )
}

export default LogsList
