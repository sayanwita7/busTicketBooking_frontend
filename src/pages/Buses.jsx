import React from 'react';
import { useLocation } from 'react-router-dom';
import BusCard from '../components/BusCard.jsx';
import BusesComponent from '../components/Buses.jsx';

function Buses() {
  const location = useLocation();
  const buses = location.state?.buses || [];

  return (
    <BusesComponent>
      {buses.length > 0 ? (
        buses.map((bus) => <BusCard key={bus.busId} {...bus} />)
      ) : (
        <p className="text-center text-gray-500 w-full col-span-full">No buses found.</p>
      )}
    </BusesComponent>
  );
}

export default Buses;
