import { useSelector } from 'react-redux'
import { RootState } from './store'
import LoginPage from './components/LoginPage'
import MainApp from './components/MainApp'

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return isAuthenticated ? <MainApp /> : <LoginPage />
}

export default App
