import React, { useState, useEffect } from "react";
import Header from "./Header";
import { displayRazorpay } from "./PaymentFunction";

const url = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchCountryData = async () => {
    const response = await fetch(url);
    const countries = await response.json();
    setCountries(countries);
    setSearchResults(countries);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const payNow = (country) => {
    displayRazorpay(country);
  };

  const searchCountry = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = countries.filter((data) =>
      data.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div>
      <Header />
      <section className="filter">
        <input
          type="search"
          placeholder="Search for a country"
          value={searchTerm}
          className="searchStyle"
          onChange={searchCountry}
        />
      </section>
      <section className="grid">
        {searchResults.map((country) => {
          const { latlng, name, population, region, capital, flags } = country;
          return (
            <article key={latlng}>
              <div onClick={() => payNow(name.common)}>
                <img src={flags.png} alt={name} />
                <div className="details">
                  <h3 className="country-name">{name.common}</h3>
                  <h4>
                    Population: <span>{population}</span>
                  </h4>
                  <h4>
                    Region: <span>{region}</span>
                  </h4>
                  <h4>
                    Capital: <span>{capital}</span>
                  </h4>
                  <div className="pay">Click to Pay...</div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Countries;
