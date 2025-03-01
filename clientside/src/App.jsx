import { useState } from "react";
import "./App.css";
import Register from "./components/user/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/user/login";
import AdminLogin from "./components/admin/adminLogin";
import HomePage from "./components/user/index";
import Forgot from "./components/admin/forget";
import Forgotuser from "./components/user/user.forget";
import PasswordChange from "./components/admin/chaingepass";
import PassChange from "./components/user/userPasschainge";
import Profile from "./components/user/userProfile";
import ProductDetail from "./components/productpage/viewproduct";
import CartPage from "./components/productpage/cart";
import WishlistPage from "./components/productpage/wishlist";
import AdminPanel from "./components/admin/adminPage";
import { MessageProvider } from "./components/context";

function App() {
  const [useremail, setUseremail] = useState("");
  const [refresh, setrefrsh] = useState("");

  console.log(`search ${useremail}`);

  return (
    <MessageProvider> 
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage useremail={useremail} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetuser" element={<Forgotuser />} />
          <Route path="/userchaingepass" element={<PassChange />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<Profile />} />

          {/* Product Routes */}
          <Route path="/productview/:_id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist/:category" element={<WishlistPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/forget" element={<Forgot />} />
          <Route path="/chaingepass" element={<PasswordChange />} />
          <Route path="/adminpage" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </MessageProvider>
  );
}

export default App;
