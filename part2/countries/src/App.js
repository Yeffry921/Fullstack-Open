import React, { useState, useEffect } from "react";
import axios from 'axios'

import CountryData from "./components/CountryData";

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ searched, setSearched ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    const userInput = event.target.value;
    
    const results = countries.filter((result) => {
      return result.name.common.toLowerCase().includes(userInput.toLowerCase())
    })

    setSearched(results)
  }

  return (
    <div>
      <header>
        <label htmlFor="countries">Find Countries
          <input id="countries" onChange={handleSearch}></input>
        </label>

        <div>
          <CountryData data={searched}/>
        </div>
      </header>
    </div>
  );
}

export default App;
