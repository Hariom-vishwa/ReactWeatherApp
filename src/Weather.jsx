import { useEffect, useState } from "react";
import "./Weather.css";

export function Weather() {
  const [city, setCity] = useState("Ayodhya");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); // Add a loading state

  const currentDate = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const fullDate = `${day} ${month}, ${year}`;

  const API_key = "4fd26710c2965b2640a825b95e9f1970";

  const weatherAPI = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const respJson = await response.json();
      console.log(respJson);
      setWeatherData(respJson);
    } catch (error) {
      console.error(error);
      setWeatherData(null); // Set weatherData to null if there's an error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    weatherAPI();
  }, []);

  const handleInput = (event) => {
    setCity(event.target.value);
  };

  const handleCity = (event) => {
    event.preventDefault();
    weatherAPI();
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      Clouds: "https://cdn-icons-png.flaticon.com/512/1779/1779812.png",
      Haze: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
      Mist: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
      Rain: "https://cdn-icons-png.flaticon.com/512/3104/3104612.png",
      Clear: "https://cdn-icons-png.flaticon.com/512/3222/3222691.png", 
    };
    return icons[condition] || "";
  };

  return (
    <div className="weatherCont">
      <div className="date">
        <h1>{fullDate}</h1>
      </div>

      <form className="searchBar" onSubmit={handleCity}>
        <input
          type="text"
          placeholder="Enter City Name"
          onChange={handleInput}
        />
        <button type="submit">
          <img
            src="https://cdn-icons-png.flaticon.com/256/3917/3917754.png"
            alt="Search"
          />
        </button>
      </form>

      {loading ? (
        <h1>Loading...</h1>
      ) : weatherData ? (
        <>
          <div className="tempCont">
            <img
              src={getWeatherIcon(weatherData.weather[0].main)}
              alt="Weather Icon"
            />
            <h1>{Math.trunc(weatherData.main.temp)}°C</h1>
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
          </div>

          <div className="bottomDets">
            {/* Wind Speed */}
            <div className="windSpeed">
              <div className="img">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1585/1585400.png"
                  alt="Wind"
                />
              </div>
              <div className="windDets">
                <h1>{weatherData.wind.speed} km/h</h1>
                <h3>Wind Speed</h3>
              </div>
            </div>
            {/* Humidity */}
            <div className="humidity">
              <div className="img">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1574/1574227.png"
                  alt="Humidity"
                />
              </div>
              <div className="humidityDets">
                <h1>{weatherData.main.humidity}%</h1>
                <h3>Humidity</h3>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="h1Error">Data not found! Please enter a valid city name.</h1>
      )}
    </div>
  );
}
