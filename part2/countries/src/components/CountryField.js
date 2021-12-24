import React from 'react';

import CountryFilter from './CountryFilter';
import CountryData from './CountryData';

const CountryField = ({ data, setSearched }) => {
	if (data.length > 10) {
		return <div>Too many matches, specify another filter</div>;
	} else if (data.length > 1 && data.length < 10) {
		return <CountryFilter countryInfo={data} setSearched={setSearched} />;
	} else if (data.length === 1) {
		return <CountryData countryInfo={data} />;
	} else {
		return null;
	}
};

export default CountryField;
