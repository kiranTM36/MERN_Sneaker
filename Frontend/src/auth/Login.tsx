import Form from './Form'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { login } from '../store/authSlice'

interface loginData {
  username: string
  email: string
  password: string
}

const Login = () => {

  const dispatch = useDispatch<AppDispatch>()

  const handleLogin = async(data : loginData) => {
    dispatch(login(data))
  }
  return (
    <Form name="Login" onEvent={handleLogin} />
  )
}

export default Login