import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function HomeComponent() {
    const [from, setFrom] = useState("KOLKATA")
    const [to, setTo] = useState("HALDIA")
    const [options, setOptions]= useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(import.meta.env.VITE_FETCH_STOPS_URL)
          .then(response => {
            setOptions(response.data);
          })
          .catch(error => {
             console.log("Stops not found!");
          });
      }, []);

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
        console.log(response)
         navigate('/buses', { state: { buses: response.data } });
                
      } catch (error) {
        console.error("Error finding bus:", error);
      }
    };

    return (
        <>
        <div className="text-purple-700 w-full mx-auto px-5 py-10 my-8 h-full flex flex-col items-center">
            
            <div className="flex flex-col items-center gap-5 w-full">
            <div className="flex gap-3 w-full justify-center">
                <select className="border border-gray-300 rounded-lg p-1 w-1/3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                value={from}
                onChange={(e) => setFrom(e.target.value)}>
                {options.map((option) => (
                    <option key={option} value={option}>
                    {option.toUpperCase()}
                    </option>))}
                </select>
            </div>
            
            <button className="bg-[#FFAB91] hover:bg-[#BF360C] text-white font-bold py-2 px-4 rounded-full mt-2" onClick={swap}>
                Swap ⇅
            </button>
            
            <div className="flex gap-3 w-full justify-center">
                <select className="border border-gray-300 rounded-lg p-1 w-1/3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                value={to}
                onChange={(e) => setTo(e.target.value)}>
                {options.map((option) => (
                    <option key={option} value={option}>
                    {option.toUpperCase()}
                    </option>))}
                </select>
            </div>
            </div>
            
            <button className="bg-[#FFAB91] hover:bg-[#BF360C] text-white font-bold py-2 px-4 rounded-full mt-5" onClick={handleSubmit}>
            Submit
            </button>
        </div>
        </>
    )
}

export default HomeComponent;