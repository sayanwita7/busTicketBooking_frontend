import React from 'react'
import {Seat, BusSeatLayout} from '../components/Seat.jsx'
import BusSearchCard from '../components/BusSearchCard.jsx'

function BusDisplayComponent() {
  return (
    <div className ='py-8'>
      <BusSeatLayout />
      <BusSearchCard/>
    </div>
  )
}

export default BusDisplayComponent
