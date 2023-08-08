import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { UserProtected } from './pages/UserProtected'

import Login from './pages/Login'
import User from './pages/user'
import Register from './pages/Register'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/user' element={<UserProtected>
            <User />
          </UserProtected>}>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
