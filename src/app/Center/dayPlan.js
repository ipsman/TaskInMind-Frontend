'use client'

import React, { useState } from 'react';

function DayPlan() {
  // 1. ÁLLAPOT BŐVÍTÉSE: Külön state az óráknak is
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startHours, setStartHours] = useState('00:00'); // Kezdőérték az órának
  const [endDate, setEndDate] = useState('');
  const [endHours, setEndHours] = useState('00:00'); // Kezdőérték az órának
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  // Nincs szükség külön handler függvényekre, használhatjuk közvetlenül a settert is
  // de a konzisztencia kedvéért meghagyhatók. Itt most a rövidebb megoldást mutatom.

  const cancelDayPlan = () => {
    document.getElementById("dayPlan").style.transform = "translateY(2000px)";
  };
  
  // 2. MENTÉS LOGIKA JAVÍTÁSA
  const save = () => {
    // Dátum és idő összefűzése a backend által várt formátumra
    const fullStartDate = `${startDate}T${startHours}`;
    const fullEndDate = `${endDate}T${endHours}`;

    // Validáció (opcionális, de erősen ajánlott)
    if (!title || !startDate || !endDate) {
        alert("A cím, a kezdő és a befejező dátum megadása kötelező!");
        return;
    }

    addEvent(fullStartDate, fullEndDate, title, description, location);
    cancelDayPlan();
  }


  async function addEvent(start, end, eventTitle, eventDesc, eventLoc) {
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
          startDate: start, // Itt már a kombinált dátumot küldjük
          endDate: end,     // Itt is
          description: eventDesc,
          location: eventLoc
        }),
      });

      if (response.status === 204) {
      alert('Esemény sikeresen elmentve 204!');
      return null; // Vagy valamilyen default érték
    }
      if (response.ok) {
        const newEvent = await response.json();
        alert('Esemény sikeresen elmentve!');
        return newEvent;
      } else {
        const errorData = await response.json();
        // 3. HIBAÜZENETEK PONTOSÍTÁSA
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
    <div className="w-full h-full absolute flex justify-center duration-200 translate-y-[2000px]" id="dayPlan">
      <div className="relative w-[50%] h-[80%] shadow-md rounded-lg m-1 p-1 dark:bg-[#000000b9] bg-[#ffffffb9] text-gray-300 overflow-hidden flex justify-center">
        <div className="m-3">
          <h2 className="text-2xl" id="dayTitle">Esemény</h2>
          <form noValidate="" action="" className="space-y-12">
            <div className="space-y-4">
              <div> 
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a title" className="w-[68.8%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white " />
              </div>
              <div className="flex gap-6 items-center">
                <input type="date" id='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-[16.5%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white " />
                {/* 4. INPUT TÍPUS JAVÍTÁSA ÉS BEKÖTÉSE */}
                <input type="time" id='startHours' value={startHours} onChange={(e) => setStartHours(e.target.value)} className="w-[12%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white " />
                <p> - </p>
                <input type="date" id='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-[16.5%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white " />
                <input type="time" id='endHours' value={endHours} onChange={(e) => setEndHours(e.target.value)} className="w-[12%]  px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white " />
              </div>
              <div>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-[68.8%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white " />
              </div>
              <div>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-[68.8%] px-3 py-2 border-b-2 duration-100 focus:border-b-4 dark:border-gray-300 dark:bg-[#00000000] focus:outline-0 text-white " />
              </div>
            </div>
            <div className="space-y-2">
              <div className='w-full flex justify-center'>
                <button type="button" onClick={save} className="absolute bottom-4 right-4 px-8 py-3 font-semibold rounded-md dark:bg-gray-50 dark:text-[#000000b9] transition-all duration-300 active:scale-75" >Save</button>
              </div>
            </div>
          </form>
        </div>
        <button className="absolute top-2 right-2" onClick={cancelDayPlan}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default DayPlan;