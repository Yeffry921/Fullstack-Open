import React from "react";
import { v4 as uuidv4 } from 'uuid';

const CountryData = ({ data }) => {
  if(data.length === 1) {
    return (
      <React.Fragment>
        <h1>{data[0].name.common}</h1>
        <p>{data[0].capital[0]}</p>
        <p>{data[0].population}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(data[0].languages).map((val) => <li key={uuidv4()}>{val}</li>)}
        </ul>
        <img alt="flag" src={data[0].flags.png} />
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      {data.length > 10 
        ? 'Too many matches, specify another filter' 
        : data.map((country) => {
          console.log(country)
            return (
              <p key={country.area}>{country.name.common}
                <button>show</button>
              </p>
            )
        })
      }
    </React.Fragment>
  )
}

export default CountryData