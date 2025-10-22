'use client'

import React, { useState } from 'react';
import MiniCalendar from "./miniCalendar";

const Sidenav = ({ onLogout }) => {

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

    const handleLogoutClick = () => {
        onLogout();
    };
    
    const openSettings = () => {
        document.getElementById("settings").style.transform = "translatey(-1925px)";
    };

    const username = localStorage.getItem('loggedInUsername');

    return (
        <div className={`dark:bg-[#000000b9] bg-[#ffffffb9] h-full transition-all duration-500 overflow-hidden ${isCollapsed ? 'w-20' : 'w-[350px]'}`}>
            <div className="flex flex-col w-full h-full">
                <div className="px-3 py-2 flex items-center justify-between">
                <h2 className={`font-bold transition-all duration-500 ${isCollapsed ? 'w-0 opacity-0' : ''}`}>Calendar</h2>
                <button className="p-2 focus:outline-none z-0" onClick={toggleCollapse}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`w-5 h-5 hover:text-gray-400 transition-all duration-300 fill-amber-50 dark:text-gray-800 ${isCollapsed ? 'w-7 h-7' : ''}`}>
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
                <div className={`absolute bottom-2 left-2 flex items-center justify-between space-x-4 ${isCollapsed ? 'w-[12.2%]' : 'w-[13.5%]'}`}>
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 border border-amber-50 rounded-lg p-2 dark:text-gray-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <div className={`transition-all duration-500 ${isCollapsed ? '-translate-x-[calc(350px)] text-[#ffffff00]' : 'translate-x-0 text-[#ffffffb9]'}`}>
                            <h2 className="text-lg font-semibold dark:text-gray-300">{ username }</h2>
                            <span className="flex items-center space-x-1 text-xs dark:text-amber-50">
                                <a rel="noopener noreferrer" href="#" className="hover:underline">View profile</a>
                            </span>
                        </div>
                    </div>
                    <div className={`
                        flex transition-all duration-500
                        ${isCollapsed ? 'flex-col items-center -translate-x-[840%] -translate-y-[45%]' : 'flex-row space-x-4 translate-x-0'}`}>
                        <button className={`hover:text-gray-400 transition-all duration-300 active:scale-75 ${isCollapsed ? 'mb-2 -translate-y-[70px] scale-125' : ''}`} onClick={openSettings}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </button>
                        <button className={`hover:text-gray-400 transition-all duration-300 active:scale-75 ${isCollapsed ? '-translate-y-[50px] scale-125' : ''}`} onClick={handleLogoutClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  export default Sidenav;