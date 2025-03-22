import React from "react";
import Info from "./Components/info";
import Form from "./Components/form";
import Weather from "./Components/Weather";
import "./App.css";

const API_KEY = "b58bf1e8368d703fbe0004bd3e9e5b81";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    humidity: undefined,
    pressure: undefined,
    windSpeed: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    var city = e.target.elements.city.value;

    if(city ) {
      try {
        const api_url = await 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!api_url.ok) {
          this.setState({
            temp: undefined,
            city: undefined,
            country: undefined,
            sunrise: undefined,
            sunset: undefined,
            humidity: undefined,
            pressure: undefined,
            windSpeed: undefined,
            error: "Город не найден. Введите, пожалуйста, корректное название"
          });
           return;
        }

        const data = await api_url.json();

        const sunset = (data.sys.sunset + data.timezone) * 1000;
        const sunrise = (data.sys.sunrise + data.timezone) * 1000;

        const sunset_date = new Date(sunset).toLocaleTimeString("ru-RU", {
          timeZone: "UTC",
        });
        const sunrise_date = new Date(sunrise).toLocaleTimeString("ru-RU", {
          timeZone: "UTC",
        });

        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          windSpeed: data.wind.speed,
          sunrise: sunrise_date,
          sunset: sunset_date,
          error: undefined
        });

      } 
      catch (error) {
         this.setState({
            temp: undefined,
            city: undefined,
            country: undefined,
            sunrise: undefined,
            sunset: undefined,
            humidity: undefined,
            pressure: undefined,
            windSpeed: undefined,
            error: "Произошла ошибка при загрузке данных"
          });
      }

    } 
    else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        humidity: undefined,
        windSpeed: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Введите, пожалуйста, название города"
      });
    }
  }

  render() {
    return (
      <div className="FormMain">
          <Info/>
          <Form weatherMethod={this.gettingWeather}/>
          <Weather 
            temp={this.state.temp}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            pressure={this.state.pressure}
            windSpeed={this.state.windSpeed}
            sunrise={this.state.sunrise}
            sunset={this.state.sunset}
            error={this.state.error}
          />
      </div>
    );
  }
}

export default App;
