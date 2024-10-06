import React, { useState } from "react";
import "./style.css"
const App = () => {
  const api = {
    key: "a6d6ee775114464c3e2a8c77bee0e168",
    url: "https://api.openweathermap.org/data/2.5/weather",
  };
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});//Stores the fetched data 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  function searchWeather() {
    setLoading(true); //fetching process has started so it gives Loading
    setError(""); 
    fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
      .then((res) => {
        if (res.status=== 404) {
          throw new Error("City not found"); 
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); 
        setWeather({}); 
        setLoading(false); 
      });
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      searchWeather();
    }
  }
  return (
    <div className="container"
  style={{
    backgroundImage: 'url("https://cdn.pixabay.com/photo/2022/04/10/09/02/cats-7122943_1280.png")',
    height: '640px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* //https://cdn.cookielaw.org/consent/23223fbb-5c84-48df-836d-0a83fb7b2c03/23223fbb-5c84-48df-836d-0a83fb7b2c03.json */}
 
      <section>
        <input
        id="input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <br />
        <button onClick={searchWeather} id="btns">Search</button>
      </section>

      {loading ? (
        <h1 id="load">Loading...</h1>
      ) : error ? (
        <p id="p">{error}</p>
      ) : weather.main !== undefined ? (
        <div className="con2">
          <h1 className="city">City Name: {weather.name}</h1>
          <h1 className="temp">Temperature: {weather.main.temp}°C</h1>
        </div>
      ) : null} 
    </div>
  );
};
export default App;

