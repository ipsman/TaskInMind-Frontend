'use client'

import React,  { useState } from 'react';
import { format } from 'date-fns';

const TopNav = ({ currentMonth, goToPreviousMonth, goToNextMonth, goToToday }) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

 const [worldTime, setWorldTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = ''; // Cseréld le a saját API kulcsodra!

  const fetchTimeForCity = async (city) => {
    setLoading(true);
    setError(null);
    const url = `https://api.api-ninjas.com/v1/worldtime`;

    try {
      const response = await fetch(url, {
        headers: {
          'X-Api-Key': API_KEY,
        },
      });

      if (!response.ok) {
        const errorBody = await response.text(); // Próbálja meg szövegként olvasni a hibaüzenetet
        throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
      }

      const data = await response.json();
      setWorldTime(data);
    } catch (e) {
      console.error('Request failed:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };


  const openDayPlan = () => {

      var day = new Date;
      const formattedDate = format(day, 'yyyy-MM-dd');
      document.getElementById("dayPlan").style.transform = "translatey(-1925px)";
      document.getElementById("date1").value = formattedDate;
      document.getElementById("date2").value = formattedDate;
      
      document.getElementById("hours1").value = day.getHours().toString().padStart(2, '0') + ":" + day.getMinutes().toString().padStart(2, '0');
      document.getElementById("hours2").value = (day.getHours()+1).toString().padStart(2, '0') + ":" + day.getMinutes().toString().padStart(2, '0');
    };

  return (
    <div className="dark:bg-[#000000b9] bg-[#ffffffb9] px-[20px] h-[55px] flex justify-between">
        <div className='flex gap-28'>
            <h1 className="text-3xl content-center">TaskInMind</h1>
            <div className="flex gap-3">
                <button
                onClick={goToToday}
                className="text-lg border my-2 px-3 rounded-4xl transition-all duration-300 hover:bg-[#7f7f7f8c] active:scale-75"
                >
                Today
                </button>
                <button
                onClick={goToPreviousMonth}
                className="hover:text-gray-400 transition-all duration-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                </button>
                <button
                onClick={goToNextMonth}
                className="hover:text-gray-400 transition-all duration-300 focus:outline-none"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                </button>
                <h2 className="text-xl content-center">
                {format(currentMonth, 'yyyy')}. {months[currentMonth.getMonth()]}
                </h2>
                
            </div>
      </div>
      <div className='flex'>
        <button className='hover:text-gray-400 transition-all duration-300' onClick={openDayPlan}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
export default TopNav;