import { useState } from 'react'
import './App.css'
import Register from './components/user/register'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Login from './components/user/login'
import AdminLogin from './components/admin/adminLogin'
import HomePage  from './components/user/index'
import Forgot from './components/admin/forget'
import Forgotuser from './components/user/user.forget'
import PasswordChange from './components/admin/chaingepass'
import PassChange from './components/user/userPasschainge'



function App() {
 const [useremail,setUseremail]=useState("")
 console.log(`search ${useremail}`);

  return (
    <>
      <BrowserRouter>
        <Routes>
      {/* <Route element={<HomePage setID={setID}/>} /> */}
          <Route path="/" element={<HomePage useremail={useremail}/>}/>
          <Route path="/admin" Component={AdminLogin}/>
          <Route path="/login" Component={Login}/>
          <Route path="/forget" Component={Forgot}/>
          <Route path="/forgetuser" Component={Forgotuser}/>
          <Route path="/register" Component={Register}/>
          <Route path="/chaingepass" Component={PasswordChange}/>
          <Route path="/userchaingepass" Component={PassChange}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
