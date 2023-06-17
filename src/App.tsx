import { useState } from "react";
import { weatherType } from "./weatherType"


const KEY = import.meta.env.VITE_API_KEY;

function App(data:weatherType) {
  const [weatherData, setWeatherData] = useState(data);
  const [city, setCity] = useState("");

  const searchCity = (e: { key: string; }) => {
    if (e.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      });
    }
  }

  return (
    <div className="flex justify-center">
    <div className="w-1/3 flex flex-wrap justify-center p-5 mt-5 bg-emerald-600 rounded-xl">
      <div className="w-full">
        <input
          type="text"
          value={city}
          name="city"
          id="search-city"
          onChange={e => setCity(e.target.value)}
          onKeyDown={searchCity}
          placeholder="Search for a city..."
          className="w-full text-center py-3 px-1 text-slate-700 rounded-xl"
          autoFocus
        />
      </div>
      <div className="w-full">
        <div className="top">
          <div className="w-full flex justify-center font-poppins text-4xl font-bold pt-6">
            <p>{weatherData.name}</p>
          </div>
          <div className="w-full flex flex-wrap mb-5">
            {weatherData.sys ?
            <p className="w-full text-center p-2 font-semibold">{weatherData.sys.country}</p> : null}
            </div>
          <div className="w-full flex justify-center font-poppins text-7xl font-light">
            {weatherData.main ?
            <h1>{weatherData.main.temp.toFixed()}˚C</h1> : null}
          </div>
          <div className="w-full flex justify-center font-rubik font-medium text-2xl mt-4">
            {weatherData.weather ?
            <p>{weatherData.weather[0].description}</p> : null}
          </div>
          <div className="w-full flex justify-center font-rubik font-medium text-2xl mt-4">
            {weatherData.weather ?
            <p>
              <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
            </p> : null}
          </div>
        </div>

        {weatherData.name !== undefined && (
          <div className="bottom">
            <div className="w-full flex flex-wrap mt-6 bg-lime-300">
              <p className="text-md w-1/2 text-right p-2 uppercase font-light font-rubik">Feels Like</p>
              {weatherData.main ?
              <p className="w-1/2 text-center p-2 font-semibold">{weatherData.main.feels_like.toFixed()}˚C</p> : null}
            </div>
            <div className="w-full flex flex-wrap my-4 bg-lime-500">
              <p className="text-md w-1/2 text-right p-2 uppercase font-light font-rubik">Humidity</p>
              {weatherData.main ?
              <p className="w-1/2 text-center p-2 font-semibold">{weatherData.main.humidity}%</p> : null}
            </div>
            <div className="w-full flex flex-wrap my-4 bg-emerald-400">
              <p className="text-md w-1/2 text-right p-2 uppercase font-light font-rubik">Wind Speed</p>
              {weatherData.wind ?
              <p className="w-1/2 text-center p-2 font-semibold">{weatherData.wind.speed.toFixed()} MPH</p> : null}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
