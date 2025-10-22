'use client'

import BasePage from "./basePage";
import React, { useState, useEffect } from 'react';
import LoginPage from "./login/page";
import RegisterPage from "./register/page";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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

      const token = localStorage.getItem('authToken');

      const tokenCreatedString = localStorage.getItem('tokenCreated');

      if (tokenCreatedString) {
        
        const tokenCreatedTimestamp = new Date(tokenCreatedString).getTime();
        
        const nowTimestamp = new Date().getTime();
        
        const timeDifferenceMs = nowTimestamp - tokenCreatedTimestamp;
        
        const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
        
        if (timeDifferenceMs <= twentyFourHoursInMs) {
          setIsLoggedIn(!!token);
        } 
      }       

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const backgroundImageUrl = `url('https://picsum.photos/seed/picsum/${screenWidth}/${screenHeight}')`;

    const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleShowLogin = () => {
    setShowRegister(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

 const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUsername');
    setIsLoggedIn(false);
  };

  return (
    <div className="w-full h-full flex-col" style={{ backgroundImage: backgroundImageUrl }}>

       {isLoggedIn ? (
        <BasePage onLogout={handleLogout} />
      ) : showRegister ? (
        <RegisterPage onSignIn={handleShowLogin} />
      ) : (
        <LoginPage onSignUp={handleShowRegister} onLoginSuccess={handleLoginSuccess} />
      )}
      
    </div>
  );
}
export default Home;