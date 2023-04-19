export { fetchCountries }


function fetchCountries(query) {
  return fetch(
    `https://restcountries.com/v3.1/name/${query}`
  ).then((response) => {
    if (!response.ok) {
      throw new Notiflix.Notify.failure('Qui timide rogat docet negare')(response.status);
    }
    return response.json();
  });
}

