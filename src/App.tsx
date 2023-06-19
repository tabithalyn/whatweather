import { useState } from "react";
import { weatherType } from "./weatherType"


const KEY = import.meta.env.VITE_API_KEY;

function App(data:weatherType) {
  const [weatherData, setWeatherData] = useState(data);
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showMore, setShowMore] = useState(false);

  const searchCity = (e: { key: string; }) => {
    if (e.key === "Enter" && searchCity.length !== 0) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          return Promise.reject(setErrorMessage("NOT FOUND. Try again."));
        }
      })
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      });
    }
  }

  return (
    <div className="flex justify-center w-screen p-5">
    <div className="w-1/3 flex flex-wrap justify-center p-3 bg-emerald-600 rounded-xl">
      <div className="w-full">
        <input
          type="text"
          value={city}
          name="city"
          id="search-city"
          onChange={e => setCity(e.target.value)}
          onKeyDown={searchCity}
          placeholder="Search for a city..."
          className="w-full text-center p-4 text-slate-700 rounded-xl"
          autoFocus
          required
        />
        {errorMessage && (
          <div className="w-full font-light text-center p-4 bg-red-300 text-lg my-4 rounded-xl">
            {errorMessage}
          </div>
        )}
      </div>
        <div className="w-full flex justify-center font-poppins text-4xl font-bold pt-6">
          {weatherData.name ? (
            <p>{weatherData.name}</p>
          ) : null}
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
          {weatherData.weather ? (
          <p>
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
          </p>
          ) : null}
        </div>

        <div onClick={() => setShowMore(!showMore)}>
          {showMore ? (
            <button><i className="fa-solid fa-chevron-up"></i></button>
          ) : (
            <button><i className="fa-solid fa-chevron-down"></i></button>
          )}
        </div>

      {weatherData.name !== undefined && showMore && (
        <div className="w-full">
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
  );
}

export default App;
