'use client'

import React, { useState } from 'react';
import MiniCalendar from "./miniCalendar";

const Sidenav = () => {

    const navigation = [
        { name: "Home", id: 'homeTitle', num: '0'},
        { name: "About Me", id: 'nabTitle', num: '1'},
        { name: "How It's Made", id: 'nhTitle', num: '2'},
        { name: "End", id: 'endTitle', num: '3'},
    ];

    const listItems = navigation.map(item =>
        <li id={item.id} key={item.name}><button className="px-3" onClick={() => GoAnchor(item.num)} >{item.name}</button></li>
    );

    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };
    


    return (
        <div className={`dark:bg-[#000000b9] bg-[#ffffffb9] px-[10px] h-full transition-all duration-500 overflow-hidden ${isCollapsed ? 'w-[80px]' : 'w-[350px]'}`}>
            <div className={`flex flex-col h-full transition-all duration-500 ${isCollapsed ? '-translate-x-[340px]' : 'translate-x-[0px]'}`}>
                <div className="space-y-3 h-full">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold">Calendar</h2>
                        <button className="p-2" onClick={toggleCollapse}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-amber-50 dark:text-gray-800">
                                <rect width="352" height="32" x="80" y="96"></rect>
                                <rect width="352" height="32" x="80" y="240"></rect>
                                <rect width="352" height="32" x="80" y="384"></rect>
                            </svg>
                        </button>
                    </div>
                    <MiniCalendar></MiniCalendar>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1">
                            {listItems}
                        </ul>
                    </div>
                </div>
                <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 border border-amber-50 rounded-lg p-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <button className="absolute top-[50%] left-1 rounded-lg dark:bg-[#000000b9] p-1 bg-[#ffffffb9]" onClick={toggleCollapse}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="text-lg font-semibold">Username</h2>
                        <span className="flex items-center space-x-1">
                            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-amber-50">View profile</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  export default Sidenav;