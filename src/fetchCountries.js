export { fetchCountries };

function fetchCountries() {
    return fetch(
      "https://jsonplaceholder.typicode.com/users?_limit=7&_sort=name"
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  };