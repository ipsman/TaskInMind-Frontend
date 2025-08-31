'use client'

import React, { useEffect, useState } from 'react';
import { fetchEventsForDay } from '../api/apiCalls';
import { format } from 'date-fns';
import ColorPicker from './elements/colorPicker';

function DayPlan({ day,  eventsForDay, onClose,  isVisible, isNewEvent }) {
  var date = new Date;
    const formattedDate = format(date, 'yyyy-MM-dd'), formattedHours = format(date, 'HH:mm'), 
    fornattedPlusHours = format(Date(date.getFullYear, date.getMonth, date.getDate, date.getHours + 1, date.getMinutes, date.getMilliseconds),'HH:mm');
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(formattedDate);
    const [startHours, setStartHours] = useState(formattedHours);
    const [endDate, setEndDate] = useState(formattedDate);
    const [endHours, setEndHours] = useState(fornattedPlusHours);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [color, setColor] = useState(null);

    const transformClass = isVisible ? 'translate-y-0' : 'translate-y-[2000px]';
      
      const save = () => {
        const fullStartDate = `${startDate}T${startHours}`;
        const fullEndDate = `${endDate}T${endHours}`;
    
        if (!title || !startDate || !endDate) {
            alert("A cím, a kezdő és a befejező dátum megadása kötelező!");
            return;
        }
    
        addEvent(fullStartDate, fullEndDate, title, description, location, color);
        onClose();
      }
    
    
      async function addEvent(start, end, eventTitle, eventDesc, eventLoc, eventColor) {
        try {
          
          const token = localStorage.getItem("authToken");
    
          const response = await fetch('http://localhost:8080/api/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
              title: eventTitle,
              startDate: start, 
              endDate: end,     
              description: eventDesc,
              location: eventLoc,
              color: eventColor
            }),
          });
    
          if (response.status === 204) {
          return null; 
        }
          if (response.ok) {
            const newEvent = await response.json();
            return newEvent;
          } else {
            const errorData = await response.json();
            
            let errorMessage = 'Esemény mentése sikertelen.';
            if (errorData && errorData.message) {
              errorMessage = errorData.message;
            }
            console.error('Esemény mentése sikertelen:', response.status, errorData);
            alert('Hiba a mentés során: ' + errorMessage);
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error('Hálózati hiba:', error);
          alert('Hálózati hiba: Nem sikerült kommunikálni a szerverrel.');
          throw error;
        }
      }

  return (
    <div className={`w-full h-full absolute flex justify-center duration-200 ${transformClass}`} id="dayPlan">
      <div className="relative w-[50%] h-[80%] shadow-md rounded-lg m-1 p-1 dark:bg-[#000000b9] bg-[#ffffffb9] text-gray-300 overflow-hidden">
        <div className="w-full h-full flex flex-col justify-center py-3 px-2">
          { isNewEvent && (
            <div className="w-full h-full">
            <h2 className="text-2xl" id="dayTitle">Event</h2><form noValidate="" action="" className="space-y-12">
              <div className="space-y-4">
                <div>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a title" className="w-[68.8%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white " />
                </div>
                <div className="flex gap-6 items-center">
                  <div className='w-[16.5%] md:w-[25%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white '>
                    <input type="date" id='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)} className="" />
                  </div>
                  <div className='w-[12%] md:w-[25%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white '>
                    <input type="time" id='startHours' value={startHours} onChange={(e) => setStartHours(e.target.value)} className="" />
                  </div>
                  <p> - </p>
                  <div className='w-[16.5%] md:w-[25%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white '>
                    <input type="date" id='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)} className="" />
                  </div>
                  <div className='w-[12%] md:w-[15%] text-center py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white '>
                    <input type="time" id='endHours' value={endHours} onChange={(e) => setEndHours(e.target.value)} className="" />
                  </div>
                </div>
                <div>
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-[68.8%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white " />
                </div>
                <div>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-[68.8%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white " />
                </div>
              </div>
                <ColorPicker pickedColor={setColor}/>
              <div className="space-y-2">
                <div className='w-full flex justify-center'>
                  <button type="button" onClick={save} className="absolute bottom-4 right-4 px-8 py-3 font-semibold rounded-md dark:bg-gray-50 dark:text-[#000000b9] transition-all duration-300 active:scale-75">Save</button>
                </div>
              </div>
            </form>
            </div>
          ) || (
            <>
            <h2 className="text-2xl text-center" id="dayTitle">{format(day, 'yyyy. MMMM d')}</h2>
            <div className='w-full h-full flex flex-col gap-2 py-[2rem]'>
              {eventsForDay.map(event => (
                <div key={event.id} className={`py-[1px] px-[2px] bg-[${event.color}] flex flex-col w-full h-[4rem] rounded-md duration-150 hover:opacity-80`}>
                  <p className='text-xl px-1'>
                    {event.title}
                  </p>
                  <p className='text-xl px-1'>
                    {format(event.startDate, "HH:mm")} - {format(event.endDate, "HH:mm")}
                  </p>
                </div>
              ))}
            </div>
            </>
          )}
          
        </div>
        <button className="absolute top-2 right-2" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default DayPlan;