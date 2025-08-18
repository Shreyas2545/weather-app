import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const apiKey = '32f114781cafe5ed35145ac91089733a'; // Replace with your valid OpenWeatherMap API key
  // Using units=metric to fetch temperature in Celsius, wind speed in m/s, and visibility in meters
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location || 'New York'}&units=metric&appid=${apiKey}`;

  // Fetch default weather data on mount
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log('Default data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching default weather data:', error);
        alert('Failed to fetch default weather data. Please check the API key or location.');
      });
  }, []); // Empty dependency array to run on mount

  // Handle location search on Enter key
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log('Search data:', response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          alert('Failed to fetch weather data. Please check the location or API key.');
        });
      setLocation('');
    }
  };

  // Log data for debugging
  console.log('Current data:', data);

  return (
    <div className="app w-full h-screen relative bg-black/40 text-white font-outfit box-border m-0 p-0">
      <div className=" pt-10 search text-center p-4">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
          className="py-2 px-6 text-lg rounded-3xl border border-white/80 bg-white/10 text-[#f8f8f8] placeholder-[#f8f8f8]"
        />
      </div>
      <div className="container max-w-2xl min-h-[700px] mx-auto px-4 relative top-10 flex flex-col justify-between">
        <div className="top w-full mx-auto my-4">
          <div className="location">
            <p className="text-2xl">{data.name || 'Loading...'}</p>
          </div>
          <div className="temp">
            {data.main ? <h1 className="text-8xl">{data.main.temp.toFixed()}°C</h1> : <h1 className="text-8xl">Loading...</h1>}
          </div><br/>
          <div className="visibility">
            {data.visibility ? <p className="text-2xl">{(data.visibility / 1000).toFixed(1)} km</p> : <p className="text-2xl">Loading...</p>}
            <p className="text-xl">Visibility</p>
          </div>
          <div className="description relative -right-[90%] origin-top-left -rotate-[91deg]">
            {data.weather ? <p className="text-2xl">{data.weather[0].main}</p> : <p className="text-2xl">Loading...</p>}
          </div>
        </div>

        {data.main && data.name && (
          <div className="bottom flex justify-around text-center w-full mx-auto my-4 p-4 rounded-xl bg-white/13 mb-50">
            <div className="feels">
              {data.main ? <p className="bold font-bold text-2xl">{data.main.feels_like.toFixed()}°C</p> : <p className="bold font-bold text-2xl">Loading...</p>}
              <p className="text-2xl">Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold font-bold text-2xl">{data.main.humidity}%</p> : <p className="bold font-bold text-2xl">Loading...</p>}
              <p className="text-2xl">Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold font-bold text-2xl">{(data.wind.speed * 3.6).toFixed()} km/h</p> : <p className="bold font-bold text-2xl">Loading...</p>}
              <p className="text-2xl">Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;