import React, { useRef, useEffect, useState } from 'react';
import { 
    format, 
    startOfMonth, 
    endOfMonth, 
    startOfWeek, 
    endOfWeek, 
    addDays, 
    eachDayOfInterval, 
    isSameDay,
    startOfDay,
    endOfDay
} from 'date-fns';
import { hu } from 'date-fns/locale';
// <<< MÓDOSÍTÁS: Importáljuk a fetchTasks-t is
import { fetchEventsForMonth, fetchTasks } from '../api/apiCalls'; 

// Segédfüggvény a Task átalakítására Eseménnyé
const taskToCalendarEvent = (task) => {
    // Csak azok a taskok jelenjenek meg, amiknek van DueDate-je
    if (!task.dueDate) return null; 

    const dateOnly = task.dueDate.split('T')[0];
    
    // Színkódolás a prioritás/állapot alapján (ez mostantól a BORDER színe lesz)
    let color = '#888888'; // Alapértelmezett szín
    if (task.completed) {
        color = '#33A070'; // Zöld
    } else if (task.priority === 'high') {
        color = '#E53E3E'; // Piros
    } else if (task.priority === 'medium') {
        color = '#DD6B20'; // Narancs
    } else if (task.priority === 'low') {
        color = '#4299E1'; // Kék/Világoskék
    }
    
    // Visszaadja a naptár által elvárt formátumot
    return {
        // Fontos: Egyedi ID-t adunk, hogy ne ütközzön az események ID-jével
        id: `task-${task.id}`, 
        title: `✅ ${task.title}`, // Kis emoji a könnyebb megkülönböztetéshez
        startDate: `${dateOnly}T09:00:00`, 
        endDate: `${dateOnly}T10:00:00`, 
        color: color, // Ez lesz a border színe
        isTask: true, // Jelölés
        completed: task.completed,
    };
};

/**
 * Ellenőrzi, hogy a 'dayToCheck' dátum beleesik-e az esemény 
 * startDate és endDate által meghatározott intervallumba.
 */
const isDayInEventRange = (dayToCheck, event) => {
    if (!event.startDate || !event.endDate) {
        return isSameDay(new Date(event.startDate), dayToCheck);
    }
    
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);

    const checkDayStart = startOfDay(dayToCheck);
    const checkDayEnd = endOfDay(dayToCheck);

    return (start <= checkDayEnd) && (end >= checkDayStart);
};


function Calendar({ currentMonth, setCurrentMonth, refreshEventsTrigger, onDaySelect, setEventId }) {
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

                // 1. Taskok betöltése (az összes)
                const allTasks = await fetchTasks(); 
                
                // 2. Taskok átalakítása eseményekké és szűrése az aktuális 3 hónapra
                const relevantTaskEvents = allTasks
                    .map(taskToCalendarEvent)
                    .filter(event => {
                        if (!event) return false;
                        const date = new Date(event.startDate);
                        const isRelevantMonth = (date.getFullYear() === year && date.getMonth() + 1 === month) ||
                                                (date.getFullYear() === prevYear && date.getMonth() + 1 === prevMonth) ||
                                                (date.getFullYear() === nextYear && date.getMonth() + 1 === nextMonth);
                        return isRelevantMonth;
                    });


                // 3. Hagyományos események betöltése (a már meglévő logika)
                const fetchedEvents = await fetchEventsForMonth(year, month),
                fetchedEventsPrev = await fetchEventsForMonth(prevYear, prevMonth),
                fetchedEventsNext = await fetchEventsForMonth(nextYear, nextMonth);

                const relevantStandardEvents = [...fetchedEventsPrev, ...fetchedEvents, ...fetchedEventsNext];

                // 4. Összefűzés és állapot frissítése
                setEvents([...relevantStandardEvents, ...relevantTaskEvents]);

            } catch (error) {
                console.error("Failed to load calendar data:", error);
                setEvents([]);
            }
        }
        loadEvents();
    }, [currentMonth, refreshEventsTrigger]);


    const openDayPlan = (day) => {
        const eventsForSelectedDay = events.filter(event =>
            isDayInEventRange(day, event)
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
                        isDayInEventRange(day, event)
                    );

                    return (
                        <div 
                            key={day.toISOString()} onClick={() => openDayPlan(new Date(day.getFullYear(), day.getMonth(), day.getDate()))}
                            className={`py-2 px-1 border-r border-b w-full lg:h-[127px] 2xl:h-[170px] 3xl:h-[242px] flex flex-col content-start gap-2 border-[#ffffff59] duration-150  last:border-r-0
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
                                <div className="flex flex-col w-full gap-1">{eventsForToday.slice(0, 2).map(eventToday => {
                                    
                                    // <<< MÓDOSÍTOTT LOGIKA: Taskok borderrel, Eventek háttérszínnel
                                    const eventStyles = eventToday.isTask
                                        ? { 
                                            // Task esetén border stílus
                                            borderColor: eventToday.color, 
                                            borderWidth: '1px', 
                                            borderStyle: 'solid',
                                            backgroundColor: 'transparent',
                                            color: eventToday.color, // Border színű szöveg
                                          }
                                        : { 
                                            // Esemény esetén háttérszín
                                            backgroundColor: eventToday.color,
                                            color: 'white', // Fehér szöveg a sötétebb háttérre
                                          };

                                    return (
                                        <div 
                                            key={eventToday.id} 
                                            className={`py-[1px] px-[2px] w-full rounded-md duration-150 hover:opacity-80`} 
                                            style={eventStyles}> 
                                            <p className='text-sm px-1'>
                                                {eventToday.title}
                                            </p>
                                        </div>
                                    )
                                }) }
                                </div>
                            )}
                        </div>
                    )})}
            </div>
        </div>
    );
}

export default Calendar;