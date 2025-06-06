import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import {login as authLogin} from '../store/authSlice.js'

function LoginComponent() {
  const [formData, setFormData] = useState({
   email: "",
   password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN_URL, {
        email: formData.email,
        password: formData.password,
      });
      const userId = response.data.userId;
      if (userId) {
            dispatch (authLogin({userData: {userId}}));
            navigate(-1);
      }
      else{
        alert("Invalid login credentials.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logging error:", error);
      alert("Logging failed.");
      navigate("/login");
    }
  };
      
  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#121212] to-fuschia-700 font-sans m-0">
          <div className="relative w-[350px] bg-white/5 rounded-[15px] p-5 text-center shadow-md backdrop-blur-md">
            <h2 className="text-white mb-5 text-xl font-semibold">LOGIN</h2>

            <div className="mb-4 text-left">
              <label htmlFor="floating_email" className="block text-sm text-gray-400 mb-1">EMAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="floating_email"
                placeholder="Enter Email"
                required
                className="w-[95%] p-2.5 rounded-lg bg-white/10 text-white text-sm border-none focus:outline-none placeholder:text-gray-300"
              />
            </div>

            <div className="mb-4 text-left">
              <label htmlFor="floating_password" className="block text-sm text-gray-400 mb-1">PASSWORD</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="floating_password"
                placeholder="Enter Password"
                required
                className="w-[95%] p-2.5 rounded-lg bg-white/10 text-white text-sm border-none focus:outline-none placeholder:text-gray-300"
              />
            </div>

            <button type="submit" className="w-full py-2.5 bg-[#1f2d52] text-white text-center rounded-full font-bold mt-2 hover:bg-[#293b6a] cursor-pointer border-none">
              LOGIN
            </button>

            <div className="mt-3 text-sm flex justify-between text-white">
              <a onClick={() => navigate("/register")} className="cursor-pointer text-[#4a90e2] hover:underline">REGISTER</a>
              <a href="#" className="text-[#4a90e2] hover:underline">FORGOT PASSWORD</a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginComponent;
