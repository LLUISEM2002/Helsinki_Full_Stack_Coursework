import { useState, useEffect } from "react";
import countries from "./services/countries";

const printList = (list) => {
  return list.map((country, index) => <li key={country.name.common}>{country.name.common}</li>);
}

const printCountry = (country) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area}</p>

        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>

        <img src={country.flags.png} alt="flag" width="150" />
    </div>
  )
}

const App = () => {
  const [countriesData, setCountriesData] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  console.log("App rendering")

  useEffect(() => {
    console.log("useEffect fired")
  }, [])

  useEffect(() => {
    countries.getAll().then(data => {
    setCountriesData(data)
  })
}, [])

const filteredCountries = countriesData.filter(country =>
  country.name.common.toLowerCase().includes(search.toLowerCase())
)

const renderCountries = () => {
  if (search === '') return null

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map(country => (
          <li key={country.name.common}>
            {country.name.common}<button onClick={() => setSelectedCountry(country)}>Show</button>
          </li>
        ))}
      </ul>
    )
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]

    return (printCountry(country))
  }
  return <p>No matches found</p>
}

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search countries..."
      />
      {renderCountries()}
      {selectedCountry && printCountry(selectedCountry)}
    </div>
  )
}

export default App;