import React from "react";

class Weather extends React.Component {
    render() {
        return (
            <div>
            { this.props.city &&
                <div>
                    <p>Местоположение: {this.props.city}, {this.props.country}</p>
                    <p>Температура: {this.props.temp}°C</p>
                    <p>Влажность: {this.props.humidity}%</p>
                    <p>Давление: {this.props.pressure} hPa</p>
                    <p>Скорость ветра: {this.props.windSpeed} м/с</p>
                    <p>Восход солнца: {this.props.sunrise}</p>
                    <p>Заход солнца: {this.props.sunset}</p>
                </div>
            }
            <p>{this.props.error}</p>
            </div>
        );
    }
}

export default Weather;
