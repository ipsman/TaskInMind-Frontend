import React, { useRef, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, eachDayOfInterval, isSameDay } from 'date-fns';
import { hu } from 'date-fns/locale';


function Calendar({ currentMonth, setCurrentMonth }) {
  const calendarRef = useRef(null);

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


  const openDayPlan = ( day ) => {

     const formattedDate = format(day, 'yyyy-MM-dd');
    document.getElementById("dayPlan").style.transform = "translatey(-1925px)";
    document.getElementById("startDate").value = formattedDate;
    document.getElementById("endDate").value = formattedDate;
    var hours = new Date;
    document.getElementById("startHours").value = hours.getHours().toString().padStart(2, '0') + ":" + hours.getMinutes().toString().padStart(2, '0');
    document.getElementById("endHours").value = (hours.getHours()+1).toString().padStart(2, '0') + ":" + hours.getMinutes().toString().padStart(2, '0');
  };

  return (
    <div ref={calendarRef} className="w-[calc(100%-8px)] h-full shadow-md rounded-lg m-1 p-1 dark:bg-[#000000b9] bg-[#ffffffb9] text-gray-300 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-[#ffffff10]">
        {['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'].map(day => (
          <div key={day} className="py-2 text-center text-sm text-[#ffffffc2]">{day}</div>
        ))}
      </div>
      <div className="h-[calc(100%-40px)] grid grid-cols-7">
        {days.map((day) => (
          <button 
            key={day.toISOString()} onClick={() => openDayPlan(new Date(day.getFullYear(), day.getMonth(), day.getDate()))}
            className={`py-2 px-1 border-r border-b flex justify-center border-[#ffffff59] w-full duration-150 hover:bg-[#ffffff1f] last:border-r-0
             ${!daysInMonth.some(d => isSameDay(d, day)) ? 'text-[#ffffff74]' : ''}`}>
            <div className={`
                p-2 h-7 w-7 flex items-center justify-center text-center
                ${isSameDay(day, today) ? 'bg-[#0000009d] text-white rounded-full font-bold border-2' : ''}
                ${!isSameDay(day, today) && !daysInMonth.some(d => isSameDay(d, day)) ? 'opacity-[30%]' : ''}
            `}>
                {format(day, 'd')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calendar;