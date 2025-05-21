import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Container from './Container.jsx';
import Logo from './Logo.jsx';

function Header() {
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
        <header className='py-4 shadow bg-[#131313]'>
        <Container>
          <nav className='flex'>
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='70px'   />
                </Link>
            </div>
            <h1 className="text-2xl font-bold text-center mb-4"> Bus Ticket Booking </h1>
            <ul className='flex ml-auto'>
              {navItems.map((item) => 
              item.active ? (
                <li key={item.name} className ='ml-2'>
                  <button
                  onClick={() => navigate(item.slug)}
                  className='inline-bock px-2 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
              ) : null
              )}
            </ul>
          </nav>
          </Container>
      </header>
    )
  }

export default Header
