import './css/styles.css';
import { fetchCountries } from "./fetchCountries";

const fetchCountriesInput = document.querySelector("#search-box");

fetchCountriesInput.addEventListener("input", () => {
  fetchCountries()
    .then((countries) => renderUserList(countries))
    .catch((error) => console.log(error));
});



function renderUserList(countries) {
  const markup = countries
    .map((user) => {
      return `
          <li>
            <p><b>Name</b>: ${user.name}</p>
            <p><b>Email</b>: ${user.email}</p>
            <p><b>Company</b>: ${user.company.name}</p>
      `;
    })
    .join("");
  console.log(markup);
}


const DEBOUNCE_DELAY = 300;
