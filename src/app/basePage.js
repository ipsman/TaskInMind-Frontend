'use client'

import React, { useState } from 'react';
import Calendar from "./Center/calendar";
import Sidenav from "./SideNav/Sidenav";
import { addMonths } from 'date-fns';
import TopNav from './Top/topNav';
import DayPlan from './Center/dayPlan';
import Settings from './Center/settings';
import WeatherDisplay from './SideNav/weatherApi';
import EditEvent from './Center/editEvent';
import TaskDashboard from './Center/taskDashboard';

const BasePage = ({ onLogout }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);
    const [eventsForSelectedDay, setEventsForSelectedDay] = useState([]);
    const [isDayPlanVisible, setIsDayPlanVisible] = useState(false);
    const [isNewEvent, setIsNewEvent] = useState(false);
    const [refreshEventsTrigger, setRefreshEventsTrigger] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditEventVisble, setEditEventVisble] = useState(false);
    const [isCalendarOpen, setCalendarOpen] = useState(true);


    

    const goToPreviousMonth = () => {
        setCurrentMonth(prevMonth => addMonths(prevMonth, -1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
    };

    const goToToday = () => {
        setCurrentMonth(new Date());
    };

    const handleDaySelect = (day, events) => {
        setSelectedDay(day);
        setEventsForSelectedDay(events);
        setIsDayPlanVisible(true);

        if (events.length > 0) {
            setIsNewEvent(false);
        } else {
            setIsNewEvent(true);
        }
    };

    const handleAddEvent = () => {
        handleDaySelect(new Date, [])
    };

    const handleEditEvent = () => {
        setEditEventVisble(true);
        setIsDayPlanVisible(false);
    }

    const handleClose = () => {
        setIsDayPlanVisible(false);
        setIsNewEvent(false);
        setRefreshEventsTrigger(prev => prev + 1);
    };

    const handleSetEvent = (event) => {
        setSelectedEvent(event);
    }

    const handleEditEventClose = () => {
        setEditEventVisble(false);
        setRefreshEventsTrigger(prev => prev + 1);
    }

    const handleOpenCalendar = (setter) => {
        setCalendarOpen(setter);

        if(setter == false){
            document.getElementById("calendarControls").style.display = "none";
        }
        else{
            document.getElementById("calendarControls").style.display = "flex";
        }
    }

    return (
        <div className="w-full h-full flex-col">
            <TopNav
                currentMonth={currentMonth}
                goToPreviousMonth={goToPreviousMonth}
                goToNextMonth={goToNextMonth}
                goToToday={goToToday}
                onSelectToday={handleAddEvent}
            />
            { isEditEventVisble && (
                    <EditEvent 
                        event={selectedEvent}
                        onClose={handleEditEventClose}
                    />
                )
            }
            {isDayPlanVisible && selectedDay && (
                <DayPlan
                    day={selectedDay}
                    eventsForDay={eventsForSelectedDay}
                    onClose={handleClose}
                    isVisible={isDayPlanVisible}
                    isNewEvent={isNewEvent}
                    setEvent={handleSetEvent}
                    handleEditEvent={handleEditEvent}
                />
            )}
            <Settings/>
            <div className="flex h-[calc(100%-55px)]">
                <Sidenav onLogout={onLogout} handleOpenCalendar={handleOpenCalendar}/>
                <div className="h-full w-full">
                    {isCalendarOpen && (
                        <Calendar
                            currentMonth={currentMonth}
                            setCurrentMonth={setCurrentMonth}
                            onDaySelect={handleDaySelect}
                            refreshEventsTrigger={refreshEventsTrigger}
                            setEvent={handleSetEvent}
                        />
                    ) || (
                        <TaskDashboard></TaskDashboard>
                    )}                
                </div>
                <div className="dark:bg-[#000000b9] bg-[#ffffffb9] px-[10px] h-full w-[80px] flex justify-center">
                    <div className='flex flex-col gap-1 text-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                        </svg>
                        <WeatherDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasePage;