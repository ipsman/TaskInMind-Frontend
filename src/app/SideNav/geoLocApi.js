"use client"; // Fontos: Ez egy kliens oldali hook

import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    // Ellenőrizzük, hogy a böngésző támogatja-e a Geolocation API-t
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser.',
        loading: false,
      }));
      return;
    }

    const successHandler = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const errorHandler = (err) => {
      let errorMessage = 'An unknown error occurred.';
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage = 'User denied the request for Geolocation.';
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.';
          break;
        case err.TIMEOUT:
          errorMessage = 'The request to get user location timed out.';
          break;
        case err.UNKNOWN_ERROR:
          errorMessage = 'An unknown error occurred.';
          break;
      }
      setLocation(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      console.error("Geolocation Error:", err.message);
    };

    // Opciók a helymeghatározáshoz
    const options = {
      enableHighAccuracy: true, // Magasabb pontosság, de lassabb és több energiát fogyaszt
      timeout: 5000,           // Időtúllépés 5 másodperc
      maximumAge: 0,           // Ne használjon gyorsítótárazott pozíciót, mindig frisset kérjen
    };

    // Lekérjük a felhasználó aktuális pozícióját
    // Fontos: Ez egy aszinkron hívás, ami engedélyt kér a felhasználótól.
    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    // Cleanup függvény: töröljük a watchert, ha a komponens lecsatolódik
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []); // Csak egyszer fut le a komponens mountolásakor

  return location;
};

export default useGeolocation;