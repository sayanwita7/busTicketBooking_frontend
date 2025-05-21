import React from 'react';

function BusCard({ busNumber, busName, busPrice, busCapacity, busDepart, busDuration, busDistance, start, stop}) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">{busName}</h2>
      <p className="text-sm text-gray-500 mb-4">Bus No: {busNumber}</p>

      <div className="flex justify-between items-center text-gray-700 mb-4">
        <div>
          <p className="font-semibold">From:</p>
          <p>{start}</p>
        </div>
        <div>
          <p className="font-semibold">To:</p>
          <p>{stop}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <div>
          <p className="font-medium">Departure:</p>
          <p>{busDepart}</p>
        </div>
        <div>
          <p className="font-medium">Duration:</p>
          <p>{busDuration}</p>
        </div>
        <div>
          <p className="font-medium">Price: INR</p>
          <p>{busPrice}</p>
        </div>
        <div>
          <p className="font-medium">Distance (km): </p>
          <p>{busDistance}</p>
        </div>
      </div>

      <p className={`text-sm font-semibold ${busCapacity > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {busCapacity > 0 ? `${busCapacity} seats available` : 'No seats available'}
      </p>
    </div>
  );
}

export default BusCard;
