'use client'

import ColorPicker from './elements/colorPicker';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { deleteEvent, editEvent } from '../api/apiCalls';
import RecurrancePicker from './elements/recurrancePicker';

function EditEvent({ event, onClose }) {
    const startDateObj = new Date(event.startDate);
    const endDateObj = new Date(event.endDate);

    const formattedDate = format(startDateObj, 'yyyy-MM-dd');
    const formattedEndDate = format(endDateObj, 'yyyy-MM-dd');
    const formattedHours = format(startDateObj, 'HH:mm');
    const fornattedPlusHours = format(endDateObj, 'HH:mm');

    const [title, setTitle] = useState(event.title);
    const [startDate, setStartDate] = useState(formattedDate);
    const [startHours, setStartHours] = useState(formattedHours);
    const [endDate, setEndDate] = useState(formattedEndDate);
    const [endHours, setEndHours] = useState(fornattedPlusHours);
    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [color, setColor] = useState(event.color);
    const [repeat, setRepeat] = useState(event.repeat);

    const save = () => {
        const fullStartDate = `${startDate}T${startHours}`;
        const fullEndDate = `${endDate}T${endHours}`;
    
        if (!title || !startDate || !endDate) {
            alert("A cím, a kezdő és a befejező dátum megadása kötelező!");
            return;
        }
    
        editEvent(fullStartDate, fullEndDate, title, description, location, color, repeat, eventId);
        onClose();
      }


    const handleDeleteEvent = () => {
      deleteEvent(event);
      onClose();
    }
  
  return (
    <div className="w-full h-full absolute flex justify-center duration-200" id="settings">
        <div className="relative w-[32%] h-[80%] shadow-md rounded-lg m-1 p-1 dark:bg-[#000000b9] bg-[#ffffffb9] text-gray-300 overflow-hidden border backdrop-blur-md">
            <div className="w-full h-full py-3 px-2">
              <h2 className="text-2xl mb-3" id="dayTitle">{title}</h2>
              <div className="w-full h-full flex flex-col gap-8">
                <div className="space-y-4">
                  <div>
                    <p className='text-lg font-semibold'>Title</p>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a title" className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:bg-gray-700/50" />
                  </div>
                  <div>
                    <p className='text-lg font-semibold'>Time</p>
                    <div className='flex gap-2 items-center'>
                      All day <div className='w-4 h-4 rounded-sm duration-200 hover:scale-110 bg-[#ffffff96] outline-2 outline-[#fff]'></div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className=' px-3 py-2 duration-100 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white flex'>
                        <input type="date" id='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:bg-gray-700/50" />
                      </div>
                      <div className='text-center py-2 duration-100 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white flex'>
                        <input type="time" id='startHours' value={startHours} onChange={(e) => setStartHours(e.target.value)} className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:bg-gray-700/50" />
                      </div>
                      <p> - </p>
                      <div className='px-3 py-2 duration-100 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white flex'>
                        <input type="date" id='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:bg-gray-700/50" />
                      </div>
                      <div className='text-center py-2 duration-100 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white flex'>
                        <input type="time" id='endHours' value={endHours} onChange={(e) => setEndHours(e.target.value)} className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:bg-gray-700/50" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className='text-lg font-semibold'>Description</p>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:bg-gray-700/50" />
                  </div>
                  <div>
                    <p className='text-lg font-semibold'>Location</p>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className=" w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-200 dark:bg-gray-700/50" />
                  </div>
                </div>
                <div className='w-full flex flex-row px-2'>
                  <ColorPicker pickedColor={setColor}/>
                  <div className='w-full'>
                    <RecurrancePicker pickedOption={setRepeat}/>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className='w-full flex justify-center'>
                    <button type="button" onClick={save} className="absolute bottom-4 right-4 px-8 py-3 font-semibold rounded-md dark:bg-gray-50 dark:text-[#000000b9] transition-all duration-300 active:scale-75">Save</button>
                    <button type="button" onClick={handleDeleteEvent} className="absolute bottom-4 left-4 px-8 py-3 font-semibold rounded-md dark:bg-gray-50 dark:text-[#000000b9] transition-all duration-300 active:scale-75">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            <button className="absolute top-2 right-2"  onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
  );
}

export default EditEvent;