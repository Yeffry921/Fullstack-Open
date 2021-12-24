import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import CountryWeather from "./CountryWeather";

const CountryData = ({ countryInfo }) => {
  const [ weather, setWeather ] = useState(null)

  const country = countryInfo[0];

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
      .then((response) => {
        setWeather(response.data)
      })
  }, [country,])

  return (
    <React.Fragment>
      <h1>{country.name.common}</h1>
      <p>{country.capital[0]}</p>
      <p>{country.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((val) => <li key={uuidv4()}>{val}</li>)}
      </ul>
      <img alt="flag" src={country.flags.png} />
      {weather !== null ? <CountryWeather weather={weather}/> : null}
    </React.Fragment>
  )
}

export default CountryData
