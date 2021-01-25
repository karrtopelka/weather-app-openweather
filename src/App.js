import { useState } from "react";
import "./App.css";
const API = {
  key: "my key",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
        .then((res) => res.json())
        .then((r) => {
          setQuery("");
          setWeather(r);
        });
    }
  };

  const datebuilder = (d) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    return `${day},  ${String(d).slice(3, 15)}`;
  };

  return (
    <div
      className={`app ${
        typeof weather.main !== "undefined" && weather.main.temp > 16 && "warm"
      }`}
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <>
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{datebuilder(new Date())}</div>
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          <>
            <h1>Nothing found</h1>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
