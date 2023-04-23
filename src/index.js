import './css/styles.css';
import { getPhoto } from './axios-reques.js';

const refs = {
    form: document.getElementById("search-form"),
    gallery: document.getElementById("gallery")
};

refs.form.addEventListener("submit", onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.searchQuery.value;
    getPhoto(inputValue).then(({ hits }) => {
        console.log(hits);

        if (hits.length === 0) throw new Error("No data!")
        
        hits.reduce((markup, hits) => createMarkup(hits), "");
    })
    .finally(() => form.reset())
    .catch(onError);
}

function createMarkup({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) {
    return `
    <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes${likes}</b>
        </p>
        <p class="info-item">
            <b>Views${views}</b>
        </p>
        <p class="info-item">
            <b>Comments${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads${downloads}</b>
        </p>
    </div>
    </div>
    `;
}

function onError(err) {
    console.error(err)
}