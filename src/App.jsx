import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className = 'min-h-screen w-full flex flex-wrap content-between bg-[#131313]'>
      <div className='w-full block'>
        <Header />
        <main> <Outlet /> </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
