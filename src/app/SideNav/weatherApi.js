"use client";

import React, { useState, useEffect } from 'react';
import useGeolocation from './geoLocApi';
import ShinyText from '../misc/shinyText';


const API_KEY = "a6936f2f79864bc5b23120259252906";

export default function WeatherDisplay() {
const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [errorWeather, setErrorWeather] = useState(null);

  useEffect(() => {
    if (geoLoading) {
      setLoadingWeather(true);
      return;
    }

    if (geoError) {
      setErrorWeather(`Could not get your location: ${geoError}`);
      setLoadingWeather(false);
      return;
    }

    if (!latitude || !longitude) {
      setErrorWeather("Location not available. Please allow location access in your browser.");
      setLoadingWeather(false);
      return;
    }

    if (!API_KEY) {
      setErrorWeather("WeatherAPI.com API key is not configured. Please check your .env.local file.");
      setLoadingWeather(false);
      return;
    }

    const fetchWeatherData = async () => {
      setLoadingWeather(true);
      setErrorWeather(null);
      try {
        const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no&lang=hu`;
        
        const response = await fetch(url);

        if (!response.ok) {
          const errorJson = await response.json();
          const errorMessage = errorJson.error?.message || response.statusText;

          if (response.status === 401 || response.status === 403) {
            throw new Error(`Unauthorized: Invalid WeatherAPI.com API Key. ${errorMessage}`);
          }
          if (response.status === 429) {
            throw new Error(`Too Many Requests: API rate limit exceeded. ${errorMessage}`);
          }
          throw new Error(`Failed to fetch weather data: ${errorMessage}`);
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setErrorWeather(err.message || "An unexpected error occurred while fetching weather data.");
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude, geoError, geoLoading]);

  if (geoLoading || loadingWeather) return  <ShinyText text={"..."} disabled={false} speed={1} className='custom-class'/>;
  if (geoError || errorWeather) return <p style={{ color: 'red' }}>Hiba: {geoError || errorWeather}</p>;
  if (!weatherData) return null;

  const current = weatherData.current;

  var tempString = String(current.temp_c).substring(0, 2);

  return (
    <div>
      {current && (
        <>
          <p >{tempString}°C</p>
        </>
      )}
    </div>
  );
}