import { useEffect, useState } from "react";
import "./Weather.css";

export function Weather() {
  const [city, setCity] = useState("Ayodhya");
  const [weatherData, setWeatherData] = useState(null);

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
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
      );

      const respJson = await response.json();
      console.log(respJson);
      setWeatherData(respJson);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    weatherAPI();
  }, []);

  const handleInput = (event) => {
    console.log(event.target.value);
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
      Clear: "https://cdn-icons-png.flaticon.com/512/3222/3222691.png", // Changed Sunny to Clear
    };
    return icons[condition] || ""; // Default to empty string if not found
  };

  return (
    <>
      <div className="weatherCont">
        <div className="date">
          <h1>{fullDate}</h1>
        </div>
        <form className="searchBar">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={handleInput}
          />
          <button onClick={handleCity}>
            <img
              src="https://cdn-icons-png.flaticon.com/256/3917/3917754.png"
              alt="Search"
            />
          </button>
        </form>

        {weatherData && (
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

            {/* <div className="tempDets">
              

              <div className="minTemp">
                <div className="img">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1035/1035619.png"
                    alt="minTemp"
                  />
                </div>
                <div className="minTempDets">
                  <h1>{Math.trunc(weatherData.main.temp_min)}°C</h1>
                  <h3>Lowest Temp</h3>
                </div>
              </div>

            

           

              <div className="maxTemp">
                <div className="img">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1035/1035618.png"
                    alt="maxTemp"
                  />
                </div>
                <div className="maxTempDets">
                  <h1>{Math.trunc(weatherData.main.temp_max)}°C</h1>
                  <h3>Highest Temp</h3>
                </div>
              </div>

             

            </div> */}


            <div className="bottomDets">

              {/* Wind Speed  */}

              <div className="windSpeed">
                <div className="img">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1585/1585400.png"
                    alt="wind"
                  />
                </div>
                <div className="windDets">
                  <h1>{weatherData.wind.speed} km/h</h1>
                  <h3>Wind Speed</h3>
                </div>
              </div>

              {/* WindSpeed End  */}

              {/* Humidity  */}

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

              {/* Humidity End  */}
            </div>
          </>
        )}
      </div>
    </>
  );
}
