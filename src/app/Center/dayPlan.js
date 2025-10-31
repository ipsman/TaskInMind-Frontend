'use client'

import React, { useState } from 'react';
import { 
    format, 
    startOfDay, 
    endOfDay,
    addDays,
    isSameDay
} from 'date-fns';
import ColorPicker from './elements/colorPicker';
import { addEvent } from '../api/apiCalls';
import RecurrancePicker from './elements/recurrancePicker';

function DayPlan({ day, eventsForDay, onClose, isVisible, isNewEvent, setEvent, handleEditEvent }) {
    
    // ... (Állapotok és inicializálás változatlan)
    const now = new Date();
    const nextHour = new Date();
    nextHour.setHours(now.getHours() + 1);
    nextHour.setMinutes(0);
    nextHour.setSeconds(0);
    
    const formattedDate = format(day, 'yyyy-MM-dd');
    const formattedHours = format(now, 'HH:mm'); 
    const formattedNextHour = format(nextHour, 'HH:mm');

    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(formattedDate);
    const [startHours, setStartHours] = useState(formattedHours);
    const [endDate, setEndDate] = useState(formattedDate);
    const [endHours, setEndHours] = useState(formattedNextHour);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [color, setColor] = useState('#FF2C2C');
    const [repeat, setRepeat] = useState('Never');
    const [isAllDay, setIsAllDay] = useState(false); 

    const transformClass = isVisible ? 'translate-y-0' : 'translate-y-[2000px]';
    var min = 30;
    
    const save = () => {

        let localStartDateTime;
        let localEndDateTime;

        if (isAllDay) {
            const startDay = startOfDay(new Date(startDate));
            const endDay = startOfDay(addDays(new Date(endDate), 1));
            
            localStartDateTime = startDay.toISOString();
            localEndDateTime = endDay.toISOString();
        } else {
            localStartDateTime = `${startDate}T${startHours}`;
            localEndDateTime = `${endDate}T${endHours}`;
        }
    
        if (!title || !startDate || !endDate) {
            alert("A cím, a kezdő és a befejező dátum megadása kötelező!");
            return;
        }
        
        addEvent(localStartDateTime, localEndDateTime, title, description, location, color, repeat, min, isAllDay); 
        onClose();
    }
    

    const openEvent = ( event ) => {
        setEvent(event);
        handleEditEvent();
    }
    
    const isEventAllDay = (event) => {
        if (event.allDay) return true; 

        try {
            const start = new Date(event.startDate);
            const end = new Date(event.endDate);

            const isStartOfDay = format(start, 'HH:mm:ss.SSS') === format(startOfDay(start), 'HH:mm:ss.SSS');
            const isEndOfDay = isSameDay(startOfDay(end), addDays(startOfDay(start), 1));
            
            return isStartOfDay && isEndOfDay;
        } catch (e) {
            return false;
        }
    }


    return (
        <div className={`w-full h-full absolute flex justify-center items-center duration-200 ${transformClass}`} id="dayPlan">
            {/* Konténer méretezése (megtartva a reszponzivitást) */}
            <div className="relative w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/2 h-5/6 max-h-[800px] shadow-2xl rounded-lg m-1 p-1 dark:bg-[#000000b9] bg-[#ffffffb9] text-gray-300 overflow-hidden border backdrop-blur-md">
                <div className="w-full h-full flex flex-col justify-start py-3 px-2 overflow-y-auto">
                    { isNewEvent ? (
                        <div className="w-full h-full">
                            <h2 className="text-xl sm:text-2xl mb-3" id="dayTitle">Event</h2>
                            
                            <div className="w-full h-full flex flex-col gap-6 sm:gap-8">
                                <div className="space-y-3 sm:space-y-4">
                                    {/* TITLE */}
                                    <div>
                                        <p className='text-md sm:text-lg font-semibold'>Title</p>
                                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a title" className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:text-white xl:p-1 text-gray-800 text-sm sm:text-base" />
                                    </div>

                                    {/* TIME SZEKCIÓ: A lehető legkompaktabb elrendezés a vízszintesség érdekében */}
                                    <div>
                                        <p className='text-md sm:text-lg font-semibold'>Time</p>
                                        <div className='flex gap-2 items-center mb-2 text-white text-sm sm:text-base'>
                                            All day 
                                            <div 
                                                className={`w-4 h-4 rounded-sm duration-200 hover:scale-110 border-2 border-gray-500 cursor-pointer ${isAllDay ? 'bg-white' : 'bg-transparent'}`}
                                                onClick={() => setIsAllDay(!isAllDay)}>
                                            </div>
                                        </div>

                                        {/* Fő konténer: Flexibilis sorkezelés és kis margó (gap-1) */}
                                        <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                                            
                                            {/* KEZDŐ DÁTUM ÉS IDŐ: Egy blokk, amely flexibilisen együtt mozog */}
                                            <div className='flex items-center gap-1'>
                                                <input 
                                                    type="date" 
                                                    id='startDate' 
                                                    value={startDate} 
                                                    onChange={(e) => setStartDate(e.target.value)} 
                                                    className="p-1 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:text-white dark:bg-gray-700/50 text-gray-800 text-sm" 
                                                />
                                                <input 
                                                    type="time" 
                                                    id='startHours' 
                                                    value={startHours} 
                                                    onChange={(e) => setStartHours(e.target.value)} 
                                                    disabled={isAllDay} 
                                                    className={`p-1 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:text-white dark:bg-gray-700/50 text-gray-800 text-sm ${isAllDay ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                                />
                                            </div>
                                            
                                            {/* KÖTŐJEL: Csak a két időpont között, flexibilisen illeszkedik */}
                                            <p className='text-sm'> - </p> 
                                            
                                            {/* BEFEJEZŐ DÁTUM ÉS IDŐ: Egy blokk, amely flexibilisen együtt mozog */}
                                            <div className='flex items-center gap-1'>
                                                <input 
                                                    type="date" 
                                                    id='endDate' 
                                                    value={endDate} 
                                                    onChange={(e) => setEndDate(e.target.value)} 
                                                    className="p-1 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:text-white dark:bg-gray-700/50 text-gray-800 text-sm" 
                                                />
                                                <input 
                                                    type="time" 
                                                    id='endHours' 
                                                    value={endHours} 
                                                    onChange={(e) => setEndHours(e.target.value)} 
                                                    disabled={isAllDay} 
                                                    className={`p-1 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:text-white dark:bg-gray-700/50 text-gray-800 text-sm ${isAllDay ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* DESCRIPTION ÉS LOCATION: Két oszlop, még mobil méretben is (sm:flex-row) */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className='w-full sm:w-1/2'>
                                            <p className='text-md sm:text-lg font-semibold'>Description</p>
                                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:text-white xl:p-1 text-gray-800 text-sm sm:text-base" />
                                        </div>
                                        <div className='w-full sm:w-1/2'>
                                            <p className='text-md sm:text-lg font-semibold'>Location</p>
                                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className=" w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:text-white xl:p-1 text-gray-800 text-sm sm:text-base" />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* COLOR PICKER ÉS REPEAT PICKER: Két oszlop (sm:flex-row) */}
                                <div className='w-full flex flex-col sm:flex-row px-2 gap-4'>
                                    <div className='w-full sm:w-1/2'>
                                        <ColorPicker pickedColor={setColor}/>
                                    </div>
                                    <div className='w-full sm:w-1/2'>
                                        <RecurrancePicker pickedOption={setRepeat}/>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <div className='w-full flex justify-end'>
                                        <button type="button" onClick={save} className="px-6 sm:px-8 py-2 sm:py-3 font-semibold rounded-md dark:bg-gray-50 dark:text-[#000000b9] transition-all duration-300 active:scale-95 text-sm sm:text-base">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                        <h2 className="text-xl sm:text-2xl text-center pb-6 sm:pb-8" id="dayTitle">{format(day, 'yyyy. MMMM d')}</h2>
                        <div className='w-full h-full flex flex-col gap-2'>
                            {eventsForDay.map(event => (
                                <div 
                                    key={event.id} 
                                    onClick={() => openEvent(event)} 
                                    className={`py-2 px-3 flex flex-col w-full rounded-md duration-150 hover:opacity-80 cursor-pointer`} 
                                    style={{ 
                                        backgroundColor: event.isTask ? 'transparent' : event.color,
                                        border: event.isTask ? `1px solid ${event.color}` : 'none',
                                        color: event.isTask ? event.color : 'white'
                                    }} 
                                >
                                    <p className='text-md sm:text-lg font-bold'>
                                        {event.title}
                                    </p>
                                    <p className={`text-xs sm:text-sm`}>
                                        {isEventAllDay(event) ? (
                                            'All Day'
                                        ) : (
                                            <>
                                                {format(new Date(event.startDate), "HH:mm")} - {format(new Date(event.endDate), "HH:mm")}
                                            </>
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                        </>
                    )}
                    
                </div>
                <button className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#ffffff10]" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 sm:size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default DayPlan;