import axios from "axios";
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { IoTicketOutline } from "react-icons/io5";
import { currentBus } from "../store/busSlice.js";

function BusCard({ busId, busNumber, busName, busPrice, busCapacity, busDepart, busDuration, busDistance, start, stop}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingData = useSelector((state) => state.booking.bookingData);
  const [bookedSeats, setBookedSeats] = useState([])
  
  const seatsBooked = async() =>{
        try {
           const seats = await axios.post(import.meta.env.VITE_FIND_SEAT_URL, {
                busId: busId,
                journeyDate: bookingData.journeyDate,
           });
           setBookedSeats(seats.data.length);
        } catch (error) {
           console.error("Error fetching booked seats:", error);
        }
    }

  const selectBus = async ()=> {
      dispatch(currentBus({
        busData: {
          busId,
          busCapacity,
          busDepart,
          busPrice,
          start,
          stop,
          busName,
          busNumber,
        }
      }));
      navigate("/buses-seats")
  }

  useEffect(() => {
    seatsBooked()
  },[])
  
  return (
    <div className="select-none bg-gradient-to-b from-white to-fuchsia-950 w-full max-w-md mx-auto rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <h2 className="text-2xl font-bold text-purple-700 mb-2">{busName}</h2>
      <p className="text-sm text-white mb-4">BUS NUMBER: {busNumber}</p>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-semibold">From:</p>
          <p>{start}</p>
        </div>
        <button onClick = {selectBus} className=" flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Book Seat <IoTicketOutline />
        </button>
        <div>
          <p className="font-semibold">To:</p>
          <p>{stop}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-white mb-4">
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
        {busCapacity > 0 ? `${busCapacity-bookedSeats} seats available` : 'No seats available'}
      </p>
    </div>
  );
}

export default BusCard;
