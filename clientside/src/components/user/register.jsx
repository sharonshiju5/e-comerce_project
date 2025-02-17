import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, User, Phone, Store, ShoppingCart } from 'lucide-react';
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import APIURL from '../path';
import axios from 'axios';
const RegisterPage = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    account: 'buyer',
    email: '',
    phone: '',
    password: '',
    cPassword: ''
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [disable, setDisable] = useState(true);

  const validatePassword = (password) => {
    if (password.length < 4) { 
      setDisable(true);
      return "Password must be at least 4 characters.";
    }
    if (!/[A-Z]/.test(password)) {
      setDisable(true);
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      setDisable(true);
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      setDisable(true);
      return "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      setDisable(true);
      return "Password must contain at least one special character.";
    }
    setDisable(false);
    return "";
  };
  

  const setForm = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    setPasswordStrength(formData.password.length)
    if (name === "password") {
      const error = validatePassword(value);
      setErrorMsg(error);
    }
  };
  
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [pass,setpass]=useState(true)
  function showpass() {
    setpass(!pass)
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(APIURL+"/adduser", formData);
      console.log(res);
      console.log("created");
      if (res.status==201) {
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          
          navigate("/login")
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="w-full max-w-md p-6 m-4 bg-white rounded-2xl shadow-lg transform hover:scale-[1.01] transition-all duration-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm">Join our community today</p>
        </div>
        <ToastContainer/>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Account Type</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              name='account'
              onClick={(e)=>setFormData((pre)=>({...pre,[e.target.name]:"buyer"}))}
              className={`p-3 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 ${
                formData.account === 'buyer'
                  ? 'bg-gray-50 border-gray-400 text-gray-700'
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart size={18} />
              <span className="font-medium">Buyer</span>
            </button>
            <button
              type="button"
              name='account'
              onClick={(e)=>setFormData((pre)=>({...pre,[e.target.name]:"seller"}))}
              className={`p-3 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 ${
                formData.account === 'seller'
                  ? 'bg-gray-50 border-gray-400 text-gray-700'
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Store size={18} />
              <span className="font-medium">Seller</span>
            </button>
          </div>
        </div>

          {/* Personal Information Section */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Personal Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="group">
                <div className="relative transform transition-all duration-200 scale-100 hover:scale-[1.02]">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 `} size={18} />
                  <input
                    type="text"
                    name='fname'
                    onChange={setForm}
                    placeholder="First Name"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-transparent placeholder-gray-400 text-gray-600 transition-all duration-200 hover:bg-orange-50/30"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative transform transition-all duration-200 scale-100 hover:scale-[1.02]">
                  <User onClick={showpass} className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200`} size={18} />
                  <input
                    type="text"
                    name='lname'
                    onChange={setForm}
                    placeholder="Last Name"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-transparent placeholder-gray-400 text-gray-600 transition-all duration-200 hover:bg-orange-50/30"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="relative transform transition-all duration-200 scale-100 hover:scale-[1.02]">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 `} size={18} />
                <input
                  type="email"
                  name='email'
                  onChange={setForm}
                  placeholder="Email Address"
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-transparent placeholder-gray-400 text-gray-600 transition-all duration-200 hover:bg-orange-50/30"

                  required
                />
              </div>

              <div className="relative transform transition-all duration-200 scale-100 hover:scale-[1.02]">
                <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200`} size={18} />
                <input
                  type="tel"
                  name='phone'
                  onChange={setForm}
                  placeholder="Phone Number"
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-transparent placeholder-gray-400 text-gray-600 transition-all duration-200 hover:bg-orange-50/30"
                  required
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Security</h3>
            <div className="space-y-3">
              <div className="relative transform transition-all duration-200 scale-100 hover:scale-[1.02]">
                <Lock onClick={showpass} className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 `} size={18} />
                <input
                  type= {pass?"password":"text"}
                  placeholder="Password"
                  name='password'
                  onChange={setForm}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-transparent placeholder-gray-400 text-gray-600 transition-all duration-200 hover:bg-orange-50/30"
                  required
                />
                <div className="mt-1 flex gap-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-full rounded-full transition-all duration-300 ${
                        i < passwordStrength ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative transform transition-all duration-200 scale-100 hover:scale-[1.02]">
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

                <Lock onClick={showpass} className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 `} size={18} />
                <input
                  type= {pass?"password":"text"}
                  placeholder="Confirm Password"
                  name='cpassword'
                  onChange={setForm}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-transparent placeholder-gray-400 text-gray-600 transition-all duration-200 hover:bg-orange-50/30"
                  required
                />
              </div>
            </div>
          </div>
            {disable ? " ":
          <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transform hover:translate-y-[-2px] transition-all duration-200 hover:shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95"
          >
            Create Account
            <ArrowRight size={18} />
          </button>
          }
        </form>

        <p className="text-center mt-4 text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to={"/login"} className="text-gray-600 hover:text-gray-800 font-semibold transition-colors duration-200">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;