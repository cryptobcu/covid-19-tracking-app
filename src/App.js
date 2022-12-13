import './App.css';
import covidLogo from "./covid-19.svg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCountries } from './api';
import { useEffect, useState } from 'react';
import AreaChart from './components/AreaChart';


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("turkey");
  
  useEffect(() => {
    const fetchCountriesData = async () => {
      const countries = await fetchCountries();
      setCountries(countries);
    };
      fetchCountriesData();
  },[])
  
  return (
    <div className="container">
      <div className="row">
        <img 
          src={covidLogo} 
          alt="covid19 logo" 
          style={{
          marginTop: 20,
          width: 100,
          height: 100,
          }} 
          className="filter-green"/>
          <div style={{
            margin: "50px",
            width: "50%",
          }}>
      <select className="form-select form-select-sm mb-3" 
      aria-label=".form-select-sm example" 
      value={country} 
      onChange={event => setCountry(event.target.value)}>
        {
          countries.map((country, key) => (
            <option key={key} value={country.Slug}> {country.Country} </option>
          ))
        }
      </select>
      </div>
    </div>
    <div className="row">
        <AreaChart country={country} />
    </div>
    </div>
  );
}

export default App;
