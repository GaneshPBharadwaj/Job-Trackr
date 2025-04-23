// import './App.css'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { useSelector } from 'react-redux'

function App() {

  const userId = useSelector((state)=>state.user._id);
  

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={ userId ? <Home/> : <Navigate to='/register' replace/> }/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
