'use client'

import React, { useState, useRef } from 'react';
import Calendar from "./Center/calendar";
import Sidenav from "./SideNav/Sidenav";
import { format, addMonths } from 'date-fns';

const BasePage = ({ onLogout }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, -1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  return (
    <div className="w-full h-full flex-col">
      <div className="dark:bg-[#000000b9] bg-[#ffffffb9] px-[10px] h-[55px] flex gap-28">
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
            className="hover:text-gray-400 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button
            onClick={goToNextMonth}
            className="hover:text-gray-400 focus:outline-none"
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
      <div className="flex h-[calc(100%-55px)]">
        <Sidenav onLogout={onLogout}></Sidenav>
        <div className="h-full w-full">
          <Calendar
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </div>
        <div className="dark:bg-[#000000b9] bg-[#ffffffb9] px-[10px] h-full w-[80px]">oldalsav</div>
      </div>
    </div>
  );
}
export default BasePage;