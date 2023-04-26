import './css/styles.css';
import Notiflix from 'notiflix';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');

const axios = require('axios').default;

console.log(form);


async function getUser(event) {
    event.preventDefault();
    let {
        elements: { searchQuery },
      } = event.currentTarget;
      const query = searchQuery.value;
    {
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=35771389-a0cc59dab35b925a54e6666bb&q=${query}&image_type=photo&orienation=horizontal&safesearch=true&per_page=40`);
renderPictureGrid(response);
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure('Oops, something went wrong')
    }
  }
};

function renderPictureGrid(response) {
    const pictures = response.data.hits;
    if (pictures.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      const grid = pictures.map((picture) => {
        return  `<div class="photo-card">
        <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${picture.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${picture.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${picture.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${picture.downloads}
          </p>
        </div>
      </div>`
      })
      .join("");
gallery.innerHTML = grid;
    }
  }
form.addEventListener('submit', getUser)



// const fetchCountriesInput = document.querySelector("#search-box");
// const countryList = document.querySelector(".country-list");
// const countrySingle = document.querySelector(".country-info");
// var debounce = require('lodash.debounce');


// fetchCountriesInput.addEventListener("input", debounce(() => {
//     const query = fetchCountriesInput.value;
//   fetchCountries(query.trim())
//     .then((countries) => renderCountryList(countries))
//     .catch((error) => Notiflix.Notify.failure('Oops, there is no country with that name'));   
//     countryList.innerHTML = "";
//     countrySingle.innerHTML = "";
// }, 300));

// function renderCountryList(countries) {
//   const countriesArray = countries
//     .map((country) => {
//       return country.name.official
//     })
//     const countryName = countries
//     .map((country) => {
//       return `
//           <li>
//           <img src=${country.flags.svg} alt="flag" height="20" /><p>${country.name.official}</p>
//           </li>
//       `;
//     })
//     .join("");
//     const countryDetails = countries
//     .map((country) => {
//       const languageCodes = Object.keys(country.languages);
//       const languages = languageCodes.map((code) => country.languages[code]);
//       return `
//           <img src=${country.flags.svg} alt="flag" width="60" /><p>${country.name.official}</p>
//           <p><b>Capital</b>: ${country.capital}</p>
//           <p><b>Population</b>: ${country.population}</p>
//           <p><b>Languages</b>: ${languages.join(', ')}</p>
//       `;
//     })
//     .join("");

// if (countriesArray.length > 9) {
//   Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
//   countryList.innerHTML = "";
//   countrySingle.innerHTML = "";
// } else if (countriesArray.length > 1) {
// countryList.innerHTML = countryName;
// countrySingle.innerHTML = "";
// } else if (countriesArray.length = 1) {
//   countrySingle.innerHTML = countryDetails;
//   countryList.innerHTML = "";
// } 
// }

// const DEBOUNCE_DELAY = 300;
