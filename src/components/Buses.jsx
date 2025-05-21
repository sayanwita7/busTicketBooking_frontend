import BusCard from "./BusCard.jsx"
import React from 'react'

function BusesComponent ({children}) {
    return <div className='w-full max-w-7xl mx-auto px-4'>
    {children} </div>;
}

export default BusesComponent