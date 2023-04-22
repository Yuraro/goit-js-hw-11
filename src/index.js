import './css/styles.css';
import { getPhoto } from './axios-reques.js';

const refs = {
    form: document.getElementById("search-form"),
    gallery: document.getElementById("gallery")
};

refs.form.addEventListener("submit", onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const inputValue = e.currentTarget.elements.searchQuery.value;
    getPhoto(inputValue).then(({ hits }) => {
        console.log(hits);

        if(hits.length === 0) throw new Error("No data!")
    }).catch(onError);
}

function onError(err) {
    console.error(err)
}