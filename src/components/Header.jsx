import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Container from './Container.jsx';
import Logo from './Logo.jsx';
import { FaBusAlt } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate()
  const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true,
        },
        {
            name: 'Login',
            slug: "/login",
            active: true,
        },
        {
            name: 'Register',
            slug: "/register",
            active: true
        },
    ]
    
  return (
    <>
      <nav className="bg-[#0d071a] text-white shadow-lg fixed w-full z-1000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link to='/'>
                  <FaBusAlt /> 
                </Link>
                <span className="ml-2 text-xl font-bold">BusKolkata</span>
              </div>
              
              <div className="ml-6 flex space-x-8">
                <ul className='flex ml-auto'>
                  {navItems.map((item) => 
                    item.active ? (
                      <li key={item.name} className ='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'>
                        <a
                        onClick={() => navigate(item.slug)}
                        className='inline-bock px-2 py-2 duration-200'
                        >{item.name}</a>
                      </li>
                    ) : null
                    )}
                </ul>
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center">
              <div className="ml-4 flex items-center">
                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
