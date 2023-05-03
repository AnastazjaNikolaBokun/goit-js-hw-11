import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const localStorageKey = "key";

const axios = require('axios').default;
let pageNumber = 1;
let query = '';

async function getUser(event) {
  event.preventDefault();
  localStorage.clear();
  let {
    elements: { searchQuery },
  } = event.currentTarget;
  query = searchQuery.value;
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=35771389-a0cc59dab35b925a54e6666bb&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`);
    await renderPictureGrid(response);
    pageNumber += 1;
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Oops, something went wrong')
  }

  localStorage.setItem(localStorageKey, query);
}

function renderPictureGrid(response) {
  const pictures = response.data.hits;
  const picturesTotalHits = response.data.totalHits;
  if (pictures.length === 0) {
    pageNumber = 0;
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    localStorage.clear();
    gallery.innerHTML = "";
    loadMore.classList.replace("load-more-visible", "load-more");
  } else {
    const grid = pictures.map((picture) => {
      return  `<div class="photo-card">
        <a href="${picture.largeImageURL}">
          <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
        </a>
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
    }).join("");

    loadMore.classList.replace("load-more", "load-more-visible");
    if (query !== localStorage.getItem(localStorageKey)) {
      gallery.innerHTML = grid;
      Notiflix.Notify.success(`Hooray! We found ${picturesTotalHits} images.`);
    } else {
      gallery.insertAdjacentHTML('beforeend', grid);
    }

    const link = document.querySelectorAll('a');
    console.log(link);

    if (link.length >= picturesTotalHits) {
      console.log("test");
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      loadMore.classList.replace("load-more-visible", "load-more");
    }

    link.forEach(function (element) {
      element.addEventListener('click', modal);
    });

    var lightbox = new SimpleLightbox('.photo-card a', {
      captionsData: 'alt',
      captionPosition: 'outside',
      captionDelay: 250,
    });

    function modal(event) {
      event.preventDefault();
      lightbox.on('show.simplelightbox');
    }

    if (gallery) {
      const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 10,
        behavior: "smooth",
      });
    }
  }
};

form.addEventListener('submit', getUser);