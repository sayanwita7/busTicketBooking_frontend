import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { booking } from '../store/bookingSlice';

import { FaBus, FaExchangeAlt, FaCalendarAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import CustomDatePicker from './DatePicker';

function BusSearchCard() {
    const [from, setFrom] = useState("KOLKATA")
    const [to, setTo] = useState("HALDIA")
    const [options, setOptions]= useState(["KOLKATA", "HALDIA"])
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(selectedDate
        axios.get(import.meta.env.VITE_FETCH_STOPS_URL)
          .then(response => {
            setOptions(response.data);
          })
          .catch(error => {
             console.log("Stops not found!");
          });
      }, [to, from, selectedDate]);

    const swap = () => {
        setFrom(to)
        setTo(from)
    }


    const handleSubmit = async (e) => {
      e.preventDefault();
      if (from == to) {
        alert("Origin and destination must be different!");
        return;
      }

      try {
        const response = await axios.post(import.meta.env.VITE_FIND_BUS_URL, {
          start: from,
          stop: to
        });
        //console.log(response)
        const journeyDate= dayjs(selectedDate).format("YYYY-MM-DD");
        //console.log(journeyDate)
        dispatch(booking({journeyDate}))
        navigate('/buses', { state: { buses: response.data } });
                
      } catch (error) {
        console.error("Error finding bus:", error);
      }
    };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="bg-white rounded-full shadow-lg flex overflow-hidden">
        {/* FROM Section */}
        <div className="flex items-center gap-3 px-6 py-6 border-r w-full sm:w-[25%]">
          <FaBus className="text-xl text-gray-600" />
          <div>
            <label className="block text-sm text-gray-400 mb-1">From: </label>
            <select className="text-lg font-semibold text-gray-900"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}>
                  {options.map((option) => (
                      <option key={option} value={option} className="bg-[#121212] text-white">
                      {option.toUpperCase()}
                      </option>))}
                  </select>
          </div>
        </div>

        {/* SWAP ICON */}
        <div className="flex items-center justify-center px-3 sm:px-6 border-r">
          <button onClick={swap} className="p-2 rounded-full border border-gray-300 hover:shadow-md transition">
            <FaExchangeAlt className="text-gray-600" />
          </button>
        </div>

        {/* TO Section */}
        <div className="flex items-center gap-3 px-6 py-6 border-r w-full sm:w-[25%]">
          <FaBus className="text-xl text-gray-600" />
          <div>
            <label className="text-sm text-gray-500">To: </label><br/>
            <select className="text-lg font-semibold text-gray-900"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}>
                  {options.map((option) => (
                      <option key={option} value={option} className="bg-[#121212] text-white">
                      {option.toUpperCase()}
                      </option>))}
                  </select>
          </div>
        </div>

        {/* DATE Section */}
        <div className="flex items-center gap-3 px-6 py-6 border-r w-full sm:w-[25%]">
          <FaCalendarAlt className="text-xl text-gray-600" />
          <div>
            <CustomDatePicker date={selectedDate} setDate={setSelectedDate} />
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <div  className="hover:bg-fuschia-700 text-black font-bold text-sm sm:text-base px-6 py-6 flex items-center justify-center rounded-r-full cursor-pointer transition w-full sm:w-auto">
          <button onClick={handleSubmit}>SEARCH BUSES </button>
        </div>
      </div>
    </div>
  );
}

export default BusSearchCard;
