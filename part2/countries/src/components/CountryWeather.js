const CountryWeather = ({ weather }) => {
  return (
    <div>
      <h3>Weather in {weather.name}</h3>
      <p>Temperature: {weather.main.temp}</p>
      <p>wind: {weather.wind.speed}</p>
    </div>
  )
}

export default CountryWeather