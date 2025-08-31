import React, { useRef, useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, eachDayOfInterval, isSameDay } from 'date-fns';
import { hu } from 'date-fns/locale';
import { fetchEventsForMonth } from '../api/apiCalls';

function Calendar({ currentMonth, setCurrentMonth, refreshEventsTrigger, onDaySelect }) {
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
        const month = currentMonth.getMonth() + 1;
        
        let prevMonth = currentMonth.getMonth();
        let prevYear = currentMonth.getFullYear();
        if (prevMonth === 0) {
            prevMonth = 12;
            prevYear -= 1;
        }

        let nextMonth = currentMonth.getMonth() + 2;
        let nextYear = currentMonth.getFullYear();
        if (nextMonth === 13) {
            nextMonth = 1;
            nextYear += 1;
        }

        const fetchedEvents = await fetchEventsForMonth(year, month),
        fetchedEventsPrev = await fetchEventsForMonth(prevYear, prevMonth),
        fetchedEventsNext = await fetchEventsForMonth(nextYear, nextMonth);

        const relevantEvents = [...fetchedEventsPrev, ...fetchedEvents, ...fetchedEventsNext];

        setEvents(relevantEvents);
      } catch (error) {
        console.error("Failed to load events:", error);
        setEvents([]);
      }
    }
    loadEvents();
  }, [currentMonth, refreshEventsTrigger]);


  const openDayPlan = (day) => {
    const eventsForSelectedDay = events.filter(event =>
      isSameDay(new Date(event.startDate), day)
    );

    onDaySelect(day, eventsForSelectedDay);
  };

  return (
    <div ref={calendarRef} className="w-[calc(100%-8px)] h-full shadow-md rounded-lg m-1 p-1 dark:bg-[#000000b9] bg-[#ffffffb9] text-gray-300 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-[#ffffff10]">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="py-2 text-center text-sm text-[#ffffffc2]">{day}</div>
        ))}
      </div>
      <div className="h-[calc(100%-40px)] grid grid-cols-7">
        {days.map((day) => {
          const eventsForToday = events.filter(event =>
      isSameDay(new Date(event.startDate), day)
    );

        return (
          <div 
            key={day.toISOString()} onClick={() => openDayPlan(new Date(day.getFullYear(), day.getMonth(), day.getDate()))}
            className={`py-2 px-1 border-r border-b w-full lg:h-[127px] 2xl:h-[170px] 3xl:h-[242px] flex flex-col content-start gap-2 border-[#ffffff59] duration-150  last:border-r-0
             ${!daysInMonth.some(d => isSameDay(d, day)) ? 'text-[#ffffff74]' : ''}`}>
             <div className='w-full flex items-center justify-center'>
              <div className={`
                  p-2 h-7 w-7 flex flex-col items-center justify-center text-center content-start
                  ${isSameDay(day, today) ? 'bg-[#0000009d] text-white rounded-full font-bold border-2' : ''}
                  ${!isSameDay(day, today) && !daysInMonth.some(d => isSameDay(d, day)) ? 'opacity-[30%]' : ''}
              `}>
                  {format(day, 'd')}

             </div>   
            </div>
            {eventsForToday.length > 0 && (
                    <div className="flex flex-col w-full gap-1">{eventsForToday.slice(0, 2).map(eventToday => (
                      <div key={eventToday.id} className={`py-[1px] px-[2px] bg-[${eventToday.color}] w-full rounded-md duration-150 hover:opacity-80`}>
                        <p className='text-sm px-1'>
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