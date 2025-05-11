'use client'

import React, { useState } from 'react';
import MiniCalendar from "./miniCalendar";

const Sidenav = () => {

    const navigation = [
        { name: "Tasks", id: 'homeTitle', num: '0'},
        { name: "Calendars", id: 'nabTitle', num: '1'},
    ];

    const listItems = navigation.map(item =>
        <li id={item.id} key={item.name}><button className="px-3" onClick={() => GoAnchor(item.num)} >{item.name}</button></li>
    );

    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };
    
    return (
        <div className={`dark:bg-[#000000b9] bg-[#ffffffb9] h-full transition-all duration-500 overflow-hidden ${isCollapsed ? 'w-20' : 'w-[350px]'}`}>
            <div className="flex flex-col h-full">
                <div className="px-3 py-2 flex items-center justify-between">
                <h2 className={`font-bold transition-all duration-500 ${isCollapsed ? 'w-0 opacity-0' : ''}`}>Calendar</h2>
                <button className="p-2 focus:outline-none z-0" onClick={toggleCollapse}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`w-5 h-5 transition-all duration-500 fill-amber-50 dark:text-gray-800 ${isCollapsed ? 'w-7 h-7' : ''}`}>
                        <rect width="352" height="32" x="80" y="96"></rect>
                        <rect width="352" height="32" x="80" y="240"></rect>
                        <rect width="352" height="32" x="80" y="384"></rect>
                    </svg>
                </button>
                </div>
                <div className={`flex flex-col h-full transition-all duration-500 ${isCollapsed ? '-translate-x-[calc(350px)]' : 'translate-x-0'}`}>
                <div className="space-y-3 h-full p-3">
                    <MiniCalendar />
                    <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1">
                        {listItems}
                    </ul>
                    </div>
                </div>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 border border-amber-50 rounded-lg p-2 dark:text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <div className={`transition-all duration-500 ${isCollapsed ? '-translate-x-[calc(350px)] text-[#ffffff00]' : 'translate-x-0'}`}>
                    <h2 className="text-lg font-semibold dark:text-gray-300">Username</h2>
                    <span className="flex items-center space-x-1 text-xs dark:text-amber-50">
                    <a rel="noopener noreferrer" href="#" className="hover:underline">View profile</a>
                    </span>
                </div>
                </div>
            </div>
        </div>
    );
  }
  export default Sidenav;