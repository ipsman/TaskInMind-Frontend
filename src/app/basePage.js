'use client'

import React, { useState } from 'react';
import Calendar from "./Center/calendar";
import Sidenav from "./SideNav/Sidenav";
import { format, addMonths } from 'date-fns';
import TopNav from './Top/topNav';
import DayPlan from './Center/dayPlan';

const BasePage = ({ onLogout }) => {

  const [currentMonth, setCurrentMonth] = useState(new Date());

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
      <TopNav
        currentMonth={currentMonth}
        goToPreviousMonth={goToPreviousMonth}
        goToNextMonth={goToNextMonth}
        goToToday={goToToday}
      />
      <DayPlan></DayPlan>
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