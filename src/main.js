import iziToast from "izitoast";
import { iziToastError } from "./js/custom_iziToast";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchGallery } from "./js/fetching";

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const spinner = document.querySelector('#loader');

function renderImage({ hits }) {
    const markup = hits
        .map(({ webformatURL, largeImageURL, likes, tags, views, comments, downloads }) => {
            return `
                <li class="gallery-item">
                    <a class="gallery-link" href="${largeImageURL}">
                        <img
                            class="gallery-image"
                            src="${webformatURL}"
                            alt="${tags}"/>
                        <ul class="descriptions">
                            <li class="description-item">
                                <p class="name">Likes</p>
                                <p class="count">${likes}</p>
                            </li>
                            <li class="description-item">
                                <p class="name">Viewes</p>
                                <p class="count">${views}</p>
                            </li>
                            <li class="description-item">
                                <p class="name">Comments</p>
                                <p class="count">${comments}</p>
                            </li>
                            <li class="description-item">
                                <p class="name">Downloads</p>
                                <p class="count">${downloads}</p>
                            </li>
                        </ul>
                    </a>
                </li>
            `
        })
        .join("");

    gallery.insertAdjacentHTML('afterbegin', markup);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    spinner.classList.add('loader');

    const userRequest = form.elements.input.value;
    fetchGallery(userRequest)
        .then(data => {
            data.hits.length != 0 ? renderImage(data) : iziToast.error(iziToastError)
            spinner.classList.remove('loader');

            lightBoxImageGallery();
        })
        .then(() => console.log(form.children))
        .catch(error => console.log(error))

    const pictureItem = document.querySelectorAll('.gallery-item')
    pictureItem.forEach(item => item.remove());
    // не впевнений шо так також можна gallery.innerHTML = '';
    form.reset();
})

function lightBoxImageGallery() {
    let lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionsPosition: 'bottom',
        captionsDelay: 250,
    });
    lightbox.show();
    lightbox.refresh();
    return lightbox;
}