import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';


const fetchCountriesInput = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countrySingle = document.querySelector(".country-info");
var debounce = require('lodash.debounce');


fetchCountriesInput.addEventListener("input", debounce(() => {
  const query = fetchCountriesInput.value;
  fetchCountries(query.trim())
    .then((countries) => renderCountryList(countries))
    .catch((error) => Notiflix.Notify.failure('Oops, there is no country with that name'));
}, 300));

function renderCountryList(countries) {
  const countriesArray = countries
    .map((country) => {
      return country.name.official
    })
    const countryName = countries
    .map((country) => {
      return `
          <li>
          <img src=${country.flags.svg} alt="flag" height="20" /><p>${country.name.official}</p>
          </li>
      `;
    })
    .join("");
    const countryDetails = countries
    .map((country) => {
      const languageCodes = Object.keys(country.languages);
      const languages = languageCodes.map((code) => country.languages[code]);
      return `
          <img src=${country.flags.svg} alt="flag" width="60" /><p>${country.name.official}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${languages.join(', ')}</p>
      `;
    })
    .join("");

if (countriesArray.length > 9) {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  countryList.innerHTML = " ";
  countrySingle.innerHTML = " ";
} else if (countriesArray.length > 1) {
countryList.innerHTML = countryName;
countrySingle.innerHTML = "";
} else if (countriesArray.length = 1) {
  countrySingle.innerHTML = countryDetails;
  countryList.innerHTML = "";
} 
}

const DEBOUNCE_DELAY = 300;
