import './css/styles.css';
import NewApiService from './axios-reques.js';
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

function onSubmit(e) {
  e.preventDefault();
    loadMoreBtn.show()
    const form = e.currentTarget;
  newApiService.query = form.elements.searchQuery.value;

  newApiService.resetPage();
  clearGallery();
    fetchHits().finally(() => form.reset())
};

function fetchHits() {
  loadMoreBtn.disable();
  return getHitsMarkup().then((markup) => {
    updatenegallery(markup)
    loadMoreBtn.enable();
  })
    .catch(onError);
};

function getHitsMarkup() {
  return newApiService
    .getPhoto()
    .then(({ hits }) => {
      if (hits.length === 0) throw new Error("No data!")
        
      return hits.reduce((markup, hits) => markup + createMarkup(hits), "");
    })
};

function createMarkup({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) {
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
  Notiflix.Notify.failure('Oops, there is no photo founded');
};
