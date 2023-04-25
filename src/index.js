import './css/styles.css';
import NewApiService from './axios-request.js';
import Notiflix from 'notiflix';
import LoadMoreBtn from './componens/LoadMoreBtn';

const refs = {
    form: document.getElementById("search-form"),
    gallery: document.getElementById("gallery"),
};
const newApiService = new NewApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: "#load-more",
  isHidden: true,
})

refs.form.addEventListener("submit", onSubmit);

loadMoreBtn.button.addEventListener("click", fetchHits);

async function onSubmit(e) {
  e.preventDefault();
  loadMoreBtn.show();
  const form = e.currentTarget;
  newApiService.query = form.elements.searchQuery.value;

  newApiService.resetPage();
  clearGallery();
  await fetchHits();
};


async function fetchHits() {
  try {
    loadMoreBtn.disable();
    const markup = await getHitsMarkup();
    updatenegallery(markup);
    loadMoreBtn.enable();
    
    if (newApiService.page > 1 && newApiService.page > newApiService.totalPages) {
      loadMoreBtn.hide();
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    onError(error);
  }
}



async function getHitsMarkup() {
  try {
    const { hits } = await newApiService.getPhoto();
  if (hits.length === 0) throw new Error("No data!");
    return hits.reduce((markup, hit) => markup + createMarkup(hit), "");
  } catch (error) {
  console.log(error);
  onError(err);
};
};

function createMarkup({webformatURL,tags,likes,views,comments,downloads}) {
    return `
    <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes<br>${likes}</b>
        </p>
        <p class="info-item">
            <b>Views<br>${views}</b>
        </p>
        <p class="info-item">
            <b>Comments<br>${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads<br>${downloads}</b>
        </p>
    </div>
    </div>
    `;
}

function updatenegallery(markup) {
  refs.gallery.insertAdjacentHTML("beforeend", markup);
}

function clearGallery() {
  refs.gallery.innerHTML = "";
}

function onError(err) {
  console.log(err);
  loadMoreBtn.hide();
  clearGallery();
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
};

