import React from 'react';

const CountryFilter = ({ countryInfo, setSearched }) => {
    return (
       <React.Fragment>
        {countryInfo.map((country) => 
          <li key={country.area}>{country.name.common}
            <button onClick={() => setSearched([country])}>show</button>
          </li>
          )
        }
    </React.Fragment>
    )
};

export default CountryFilter;
