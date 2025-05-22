import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import BusSearchCard from './BusSearchCard.jsx';

function HomeComponent() {
    

    return (
        <>
        <BusSearchCard/>
        <div className="bg-gradient-to-b from-[#121212] to-fuschia-700 text-white w-full mx-auto px-5 py-10 my-8 h-full flex flex-col items-center">
          <p>Welcome to BusKolkata! This is only limited to a few places for now but we'll keep adding more for your ease soon!</p>
        </div>
        </>
    )
}

export default HomeComponent;