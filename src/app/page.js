'use client'

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
  
  const [screenWidth, setScreenWidth] = useState(0); // Kezdeti érték 0 vagy null lehet
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    // Ellenőrizzük, hogy a kód a kliens oldalon fut-e
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
      };

      // Azonnal beállítjuk a kezdeti értékeket a kliens oldalon
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
      <div className="bg-gradient-to-b from-[#000000b9] from-50% via-[#00000093] via-80% to-[#00000010] to-100% px-[10px] h-[55px] flex gap-28">
        <h1 className="text-3xl content-center">TaskInMind</h1>
        <p className="text-xl content-center">{currentYear}. {months[currentMonth]}</p>
      </div>
      <div className="flex h-[calc(100%-55px)]">
        <div className="bg-gradient-to-r from-[#000000b9] from-50% via-[#00000093] via-80% to-[#00000010] to-100% px-[10px] h-full"> <Sidenav></Sidenav></div>
        <div className=" px-[10px] h-full w-full"> kozep</div>
        <div className="bg-gradient-to-l from-[#000000b9] from-50% via-[#00000093] via-80% to-[#00000010] to-100% px-[10px] h-full w-[80px]">oldalsav</div>
      </div>
    </div>
  );
}
export default Home;