import React from "react";
import { v4 as uuidv4 } from 'uuid';

const CountryData = ({ countryInfo }) => {
  const country = countryInfo[0];
  // console.log(countryInfo)
  console.log(country)
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
    </React.Fragment>
  )
}

export default CountryData