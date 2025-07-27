import React, { useRef, useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, eachDayOfInterval, isSameDay } from 'date-fns';
import { hu } from 'date-fns/locale';
import { fetchEventsForMonth } from '../api/apiCalls';

function Calendar({ currentMonth, setCurrentMonth, refreshEventsTrigger }) {
  const calendarRef = useRef(null);

  const [events, setEvents] = useState([]);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const firstDayOfWeek = startOfWeek(firstDayOfMonth, { locale: hu });
  const lastDayOfWeek = endOfWeek(lastDayOfMonth, { locale: hu });

  const days = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });

  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  const today = new Date();

  const handleWheel = (event) => {
    event.preventDefault();

    if (event.deltaY > 0) {
      setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    } else if (event.deltaY < 0) {
      setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (calendarRef.current) {
        calendarRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentMonth, setCurrentMonth]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1; // getMonth() is 0-indexed
        const fetchedEvents = await fetchEventsForMonth(year, month);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to load events:", error);
        setEvents([]); // Clear events on error
      }
    }
    loadEvents();
  }, [currentMonth, refreshEventsTrigger]);

  const openDayPlan = ( day ) => {

     const formattedDate = format(day, 'yyyy-MM-dd');
    document.getElementById("dayPlan").style.transform = "translatey(-1925px)";
    document.getElementById("startDate").value = formattedDate;
    document.getElementById("endDate").value = formattedDate;
    var hours = new Date;
    document.getElementById("startHours").value = hours.getHours().toString().padStart(2, '0') + ":" + hours.getMinutes().toString().padStart(2, '0');
    document.getElementById("endHours").value = (hours.getHours()+1).toString().padStart(2, '0') + ":" + hours.getMinutes().toString().padStart(2, '0');

    const eventsForSelectedDay = events.filter(event =>
      isSameDay(new Date(event.startDate), day)
    );
    // Assuming onDaySelect is a prop function that the parent (DayPlan) provides
    // to receive the selected day's events.
    if (typeof onDaySelect === 'function') {
      onDaySelect(day, eventsForSelectedDay);
    }
  };

  return (
    <div ref={calendarRef} className="w-[calc(100%-8px)] h-full shadow-md rounded-lg m-1 p-1 dark:bg-[#000000b9] bg-[#ffffffb9] text-gray-300 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-[#ffffff10]">
        {['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'].map(day => (
          <div key={day} className="py-2 text-center text-sm text-[#ffffffc2]">{day}</div>
        ))}
      </div>
      <div className="h-[calc(100%-40px)] grid grid-cols-7">
        {days.map((day) => {
          const hasEvents = events.some(event => isSameDay(new Date(event.startDate), day));
          const eventsForToday = events.filter(event =>
      isSameDay(new Date(event.startDate), day)
    );

        return (
          <div 
            key={day.toISOString()} onClick={() => openDayPlan(new Date(day.getFullYear(), day.getMonth(), day.getDate()))}
            className={`py-2 px-1 border-r border-b w-full h-full flex flex-col justify-center border-[#ffffff59] duration-150  last:border-r-0
             ${!daysInMonth.some(d => isSameDay(d, day)) ? 'text-[#ffffff74]' : ''}`}>
            <div className={`
                p-2 h-7 w-7 flex flex-col items-center justify-center text-center
                ${isSameDay(day, today) ? 'bg-[#0000009d] text-white rounded-full font-bold border-2' : ''}
                ${!isSameDay(day, today) && !daysInMonth.some(d => isSameDay(d, day)) ? 'opacity-[30%]' : ''}
            `}>
                {format(day, 'd')}

                
            </div>
            {hasEvents && (
                    <div className="flex flex-col w-full gap-1">{eventsForToday.slice(0, 2).map(eventToday => (
                      <div key={eventToday.id} className='py-[1px] px-[2px] bg-[#ff000059] w-full rounded-md hover:bg-[#ff0000b7]'>
                        <p>
                            {eventToday.title}
                        </p>
                      </div>
                    )) }
                    </div>
                )}
          </div>
        )})}
      </div>
    </div>
  );
}

export default Calendar;