import './css/styles.css';
import Notiflix from 'notiflix';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const localStorageKey = "key";

const axios = require('axios').default;
let pageNumber = 1;


async function getUser(event) {
    event.preventDefault();
    let {
        elements: { searchQuery },
      } = event.currentTarget;
      const query = searchQuery.value
    {
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=35771389-a0cc59dab35b925a54e6666bb&q=${query}&image_type=photo&orienation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`);
renderPictureGrid(response)
pageNumber += 1;
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure('Oops, something went wrong')
    }
  }

  localStorage.setItem(localStorageKey, query);

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
      if (query !== localStorage.getItem(localStorageKey)) {
        gallery.innerHTML = grid;

      } else {
        gallery.insertAdjacentHTML('beforeend', grid);
      }
  }
}
};
form.addEventListener('submit', getUser)


