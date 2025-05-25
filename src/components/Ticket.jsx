import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function TicketComponent() {
  const location = useLocation();
  const tickets = location.state || [];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans py-12 px-4">
      <h1 className="text-3xl text-white font-bold text-center mb-10">Your Tickets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {tickets.map((ticketData, index) => (
          <div
            key={index}
            className="w-[350px] bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md transition transform hover:scale-105 hover:shadow-xl text-white"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Ticket #{ticketData.ticketId}</h3>

            <div className="space-y-3 text-sm">
              <Detail label="Bus" value={ticketData.busName} />
              <Detail label="Bus Number" value={ticketData.busNumber} />
              <Detail label="Journey Date" value={ticketData.journeyDate} />
              <Detail label="Seat Number" value={ticketData.seatNumber} />
              <Detail label="Origin" value={ticketData.start} />
              <Detail label="Destination" value={ticketData.stop} />
              <Detail label="Total Price" value={`INR ${ticketData.price}`} className="text-green-400" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/")}
          className="py-3 px-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl shadow-md transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

// Helper component for consistent label/value styling
function Detail({ label, value, className }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-medium">{label}:</span>
      <span className={`bg-violet-100/20 rounded px-3 py-1 ${className}`}>{value}</span>
    </div>
  );
}

export default TicketComponent;
