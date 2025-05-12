import { useState } from 'react';
import axios from "axios";
import './App.css';
import 'dotenv/config'

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "CUSTOMER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(import.meta.env.VITE_REGISTER_URL, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType: "CUSTOMER"
      });

      console.log(response.data);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed.");
    }
  };

  return (
    <>
      <h1>Welcome to Bus Ticket Booking!</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600">
            Email address
          </label>
        </div>

        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600">
            Password
          </label>
        </div>

        {/* Confirm Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600">
            Confirm password
          </label>
        </div>

        {/* Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600">
            Name
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
