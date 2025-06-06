import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function AllUserTicketsComponent() {
        const [tickets, setTicket]= useState([])
        const user = useSelector((state) => state.auth.userData)
    
        const fetchTickets = () => {
            axios.post(import.meta.env.VITE_FETCH_ALL_TICKETS_URL,{
                    userId: user.userId
            })
            .then(response => {
                //console.log(response.data)
                setTicket(response.data);
            })
            .catch(error => {
                console.log("Error in finding tickets: ", error);
            });
        };
        const cancelTicket = async (bookingId) => {
            try {
                await axios.post(import.meta.env.VITE_CANCEL_SEAT_URL, { 
                    bookingId: bookingId });
                fetchTickets();
            } catch (error) {
                console.error("Error cancelling ticket", error);
            }
        };

        useEffect(() => {
            fetchTickets();
        }, []);
        



        return (
            <div className="min-h-screen font-sans py-12 px-4">
            <h1 className="select-none text-3xl text-white font-bold text-center mb-10">Your Tickets</h1>

            <div className="select-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {tickets.map((ticketData, index) => (
                <div
                    key={index}
                    className="w-[350px] bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md transition transform hover:scale-105 hover:shadow-xl text-white"
                >
                    <h3 className="text-xl font-semibold mb-4 text-center">Ticket #{ticketData.ticketId}</h3>

                    <div className="space-y-3 text-sm">
                    <Detail label="Bus" value={ticketData.busName} />
                    <Detail label="Bus Number" value={ticketData.busNumber} />
                    <Detail label="Journey Date" value={
                            new Intl.DateTimeFormat('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            }).format(new Date(ticketData.journeyDate))} />
                    <Detail label="Seat Number" value={ticketData.seatNumber} />
                    <Detail label="Origin" value={ticketData.start} />
                    <Detail label="Destination" value={ticketData.stop} />
                    <Detail label="Departure" value={ticketData.departure} />
                    <Detail label="Total Price" value={`INR ${ticketData.price}`} className="text-green-400" />
                    <button onClick={() => cancelTicket(ticketData.bookingId)}>
                        Cancel Ticket </button>
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

export default AllUserTicketsComponent;