'use client'

import Calendar from "./Center/calendar";
import Sidenav from "./SideNav/Sidenav";
import React, { useEffect, useState } from 'react';

const Home = () => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const months = [
    "január",
    "február",
    "március",
    "április",
    "május",
    "június",
    "július",
    "augusztus",
    "szeptember",
    "október",
    "november",
    "december"
  ];
  
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
      };

      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const backgroundImageUrl = `url('https://picsum.photos/${screenWidth}/${screenHeight}')`;

  return (
    <div className="w-full h-full flex-col" style={{ backgroundImage: backgroundImageUrl }}>
      <div className="dark:bg-[#000000b9] bg-[#ffffffb9] px-[10px] h-[55px] flex gap-28">
        <h1 className="text-3xl content-center">TaskInMind</h1>
        <p className="text-xl content-center">{currentYear}. {months[currentMonth]}</p>
      </div>
      <div className="flex h-[calc(100%-55px)]">
        <Sidenav></Sidenav>
        <div className="h-full w-full"><Calendar></Calendar></div>
        <div className="dark:bg-[#000000b9] bg-[#ffffffb9] px-[10px] h-full w-[80px]">oldalsav</div>
      </div>
    </div>
  );
}
export default Home;