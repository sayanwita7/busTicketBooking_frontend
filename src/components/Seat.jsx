import React, {useEffect, useState} from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { currentBus } from "../store/busSlice.js";
import { booking, cancelletion } from "../store/bookingSlice.js";
import { login } from "../store/authSlice.js";

import { MdOutlineChair } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";

export const Seat = ({isSelected, isBooked, onClick}) => {
    return (
        <MdOutlineChair className = {`text-3xl -rotate-90 cursor-pointer ${isBooked ? 'text-red-600' : (isSelected ? 'text-violet-600' : 'text-neutral-600')}`} onClick ={onClick} />
    )
}

export const BusSeatLayout = () => {
    const busData = useSelector((state) => state.bus.busData);
    const bookingData = useSelector((state) => state.booking.bookingData);
    const userData = useSelector((state) => state.auth.userData);
    const totalSeats = 47;
    const [selectedSeats, setSelectedSeats] = useState([])
    const [bookedSeats, setBookedSeats] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const price = selectedSeats.length*busData.busPrice;
        
    const seatsBooked = async() =>{
        // console.log("Journey date seatsBooked(): ",bookingData.journeyDate)
        // console.log("busData: ", busData)
        // console.log("bookingData: ", bookingData)
        // console.log("userData: ", userData)
        try {
           const seats = await axios.post(import.meta.env.VITE_FIND_SEAT_URL, {
                busId: busData.busId,
                journeyDate: bookingData.journeyDate,
           });
           setBookedSeats(seats.data);
        } catch (error) {
           console.error("Error fetching booked seats:", error);
        }
    }

    const bookSeat = async () => {
        // console.log("Booking Data bookSeat(): ",bookingData)
        // console.log("Journey date bookSeat(): ",bookingData.journeyDate)
        const bookedTickets = [];
        for (let seat of selectedSeats) {
            const res = await axios.post(import.meta.env.VITE_BOOK_SEAT_URL, {
                seatNumber: seat,
                userId: userData.userId,
                busId: busData.busId,
                journeyDate: bookingData.journeyDate,
                start: busData.start,
                stop: busData.stop,
                price: busData.busPrice
            });

            const ticketInfo = res.data.bookingDetails;
            bookedTickets.push(ticketInfo);
        }
        setSelectedSeats([])
        navigate("/tickets", { state: bookedTickets });
    }

    const handleSeatClick = (seatNumber) => {
        if (!bookedSeats.includes(seatNumber)) {
            if (selectedSeats.includes(seatNumber)) {
                setSelectedSeats((prevSeats) =>
                    prevSeats.filter((seat) => seat !== seatNumber)
                );
            } else {
                if (selectedSeats.length < 10) {
                    setSelectedSeats((prevSeats) => {
                        const updatedSeats = [...prevSeats, seatNumber];
                        return updatedSeats;
                    });
                } else {
                    alert("Maximum 10 seats allowed!");
                }
            }
        }
    };


    const renderSeats = () => {
        let seats =[];
        for (let i=1; i<= totalSeats; i++){

            seats.push(
                <Seat
                key={i}
                seatNumber={i}
                isSelected={selectedSeats.includes(i)}
                isBooked={bookedSeats.includes(i)}
                onClick={() => handleSeatClick(i)}
                />
            )
        }
        return seats;
    }

    useEffect(() => {
        seatsBooked();
    },[]);
    return (
        <div className='select-none flex flex-col md:flex-row items-center justify-center'>
            <div className= 'space-y-5'> 
                <div>
                    <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium"> {busData.busName}: {busData.busDepart}</h2>
                    <h3 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium"> Seats Available: {busData.busCapacity - bookedSeats.length}</h3>
                    
                </div>
                {/*Seat Layout*/}
                <div className="w-full flex">
                    <div className="w-full flex-1 flex">
                        <div className="w-full flex-1 flex gap-x-5 items-stretch">
                            <div className="w-10 h-full border-r-2 border-dashed border-neutral-300 dark:border-neutral-800">
                                <GiSteeringWheel className='text-3xl mt-6 text-violet-600 -rotate-90' />
                            </div>
                            {/*Seat Layout*/}
                            <div className="flex flex-col items-center">
                                <div className="flex-1 space-y-4">
                                    <div className="w-full grid grid-cols-10 gap-x-3">
                                        {renderSeats().slice(0,10)}
                                    </div>
                                    <div className="w-full grid grid-cols-10 gap-x-3">
                                        {renderSeats().slice(10,20)}
                                    </div>
                                    <div className="w-full grid grid-cols-10 gap-x-3">
                                        {renderSeats().slice(20,30)}
                                    </div>
                                    <div className="w-full grid grid-cols-10 gap-x-3">
                                        <div className="col-span-9"></div>
                                        {renderSeats().slice(30,31)}
                                    </div>
                                    <div className="w-full grid grid-cols-10 gap-x-3">
                                        {renderSeats().slice(31,34)}
                                        <div className="col-span-2"></div>
                                        {renderSeats().slice(34,35)}
                                        {renderSeats().slice(35,39)}
                                    </div>
                                    <div className="w-full grid grid-cols-10 gap-x-3">
                                        {renderSeats().slice(39,42)}
                                        <div className="col-span-2"></div>
                                        {renderSeats().slice(42,43)}
                                        {renderSeats().slice(43,47)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Instructions and info*/}
                    <div className="space-y-3 w-28"></div>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-4 border rounded-2xl shadow-md bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">
            {/* Selected Seats */}
                <div>
                    <h3 className="text-lg font-semibold mb-1">Selected Seats</h3>
                    <p className="text-sm bg-violet-100 dark:bg-violet-800 rounded-md p-2 min-h-[40px]">
                        {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                    </p>
                </div>
            {/* Total Price */}
                <div>
                    <h3 className="text-lg font-semibold mb-1">Total Price</h3>
                    <p className="text-sm bg-green-100 dark:bg-green-800 rounded-md p-2">
                        INR {price}
                    </p>
                </div>
            {/* Book Seats Button */}
                <div className="mt-auto">
                    <button onClick={bookSeat} className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow-md transition duration-200">
                        Book Seats
                    </button>
                </div>
            </div>
        </div>
    )
}
// export default {Seat, BusSeatLayout};