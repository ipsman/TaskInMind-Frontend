
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, eachDayOfInterval } from 'date-fns';
import { hu } from 'date-fns/locale';

function MiniCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const firstDayOfWeek = startOfWeek(firstDayOfMonth, { locale: hu });
  const lastDayOfWeek = endOfWeek(lastDayOfMonth, { locale: hu });

  const days = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });

  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const formattedMonth = format(currentMonth, 'yyyy MMMM', { locale: hu });

  return (
    <div className="w-[calc(w-full - 8px)] h-50% shadow-md rounded-lg m-1 p-1 dark:bg-[#000000b9] bg-[#ffffffb9] text-gray-300">
      <div className="flex items-center justify-between py-4 px-6">
        <button
          onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
          className="hover:text-gray-400 focus:outline-none">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold">{formattedMonth}</h2>
        <button
          onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
          className="hover:text-gray-400 focus:outline-none">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 011.414 0L10 11.414l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414-1.414L10 8.586l-4.293-4.293a1 1 0 01-1.414 1.414l5 5a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 border-b border-[#ffffff10]">
        {['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'].map(day => (
          <div key={day} className="py-2 text-center text-sm text-[#ffffffc2]">{day}</div>
        ))}
      </div>
      <div className="h-[40%] grid grid-cols-7">
        {days.map((day) => (
          <div
            key={day}
            className={`py-2 px-1 text-center border-r border-b border-[#ffffff59] last:border-r-0 ${
              !daysInMonth.some(d => d.getTime() === day.getTime()) ? 'text-[#ffffff74]' : ''
            }`}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
}
export default MiniCalendar;