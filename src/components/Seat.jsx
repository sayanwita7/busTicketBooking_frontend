import React, {useState} from "react";
import { MdOutlineChair } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { GiBusDoors } from "react-icons/gi";

export const Seat = ({seatNumber, isSelected, onClick}) => {
    return (
        <MdOutlineChair className = {`text-3xl -rotate-90 cursor-pointer ${isSelected ? 'text-violet-600' : 'text-neutral-600'}`} onClick ={onClick} />
    )
}

export const Door = ({seatNumber}) => {
    return (
        <GiBusDoors className = 'text-3xl cursor-pointer' />
    )
}
export const BusSeatLayout = () => {
    const totalSeats = 47;
    const [selectedSeats, setSelectedSeats] = useState([])

    const handleSeatClick = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)){
            setSelectedSeats(selectedSeats.filter((seat) => seat!==seatNumber))
        } else{
            if (selectedSeats.length <10){
                setSelectedSeats([...selectedSeats, seatNumber ])
            } else{
                alert ("Maximum 10 seats allowed!")
            }
        }
    }

    const renderSeats = () => {
        let seats =[];
        for (let i=1; i<= totalSeats; i++){
            
            seats.push(
                <Seat
                key={i}
                seatNumber={i}
                isSelected={selectedSeats.includes(i)}
                onClick={() => handleSeatClick(i)}
                />
            )
        }
        return seats;
    }

    return (
        <div className= 'space-y-5'>
            <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
                Choose a seat
            </h2>  

            {/*Seat Layout*/}
            <div className="w-full flex justify-between">
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
            {/*Selected Seats*/}
            {/*Calculate price*/}
        </div>
    )
}
// export default {Seat, BusSeatLayout};