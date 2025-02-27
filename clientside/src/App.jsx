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
import Profile from './components/user/userProfile'
import ProductDetail from './components/productpage/viewproduct'
import CartPage from './components/productpage/cart'
import WishlistPage from './components/productpage/wishlist'
import AdminPanel from './components/admin/adminPage'



function App() {
 const [useremail,setUseremail]=useState("")
 console.log(`search ${useremail}`);

  return (
    <>
      <BrowserRouter>
        <Routes>
      {/* user */}

      {/* <Route element={<HomePage setID={setID}/>} /> */}
          <Route path="/" element={<HomePage useremail={useremail}/>}/>
          <Route path="/login" Component={Login}/>
          <Route path="/forgetuser" Component={Forgotuser}/>
          <Route path="/userchaingepass" Component={PassChange}/>
          <Route path="/register" Component={Register}/>
          <Route path="/userprofile" Component={Profile}/>
      
      {/* product */}
          <Route path="/productview/:_id" Component={ProductDetail}/>
          <Route path="/cart" Component={CartPage}/>
          <Route path="/wishlist" Component={WishlistPage}/>

      {/* admin */}
          <Route path="/admin" Component={AdminLogin}/>
          <Route path="/forget" Component={Forgot}/>
          <Route path="/chaingepass" Component={PasswordChange}/>
          <Route path="/adminpage" Component={AdminPanel}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
