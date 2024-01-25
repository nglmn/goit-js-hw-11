// Описаний у документації
import iziToast from "izitoast";
import { iziToastError } from "./custom_iziToast";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.form');
const search = document.querySelector('.search-container');
const gallery = document.querySelector('.gallery');



const URL = 'https://pixabay.com/api/';
const API_KEY = '41991233-e464ef3fed32efbb52a55d5bb';

const fullAddres = `${URL}?key=${API_KEY}`;


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userRequest = form.elements.input.value;

    fetchGallery(userRequest)
        .then(data => {
            renderImage(data);
            let lightbox = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionsPosition: 'bottom',
                captionsDelay: 250,
            });
            lightbox.show();
            lightbox.refresh();
        })
        .catch(error => console.log(error))
    form.reset();
})

function fetchGallery(userRequest) {
    const searchParams = new URLSearchParams({
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
    })

    return fetch(`${fullAddres}&q=${userRequest}&${searchParams}`, {
        method: 'GET'
    })
        .then((responce) => {
            spinner();
            return responce;
        })
        .then((responce) => {
            if (!responce.ok) {
                throw new Error(responce.status)
            }
            return responce.json();
        })
}

function renderImage({ hits }) {

    if (hits.length === 0) {
        return iziToast.error(iziToastError);
    }
    const markup = hits
        .map(({ webformatURL, largeImageURL, likes, tags, views, comments, downloads }) => {
            return `
                <li class="gallery-item">
                    <a
                        class="gallery-link"
                        href="${largeImageURL}"
                        >
                        <img
                            class="gallery-image"
                            src="${webformatURL}"
                            alt="${tags}"
                        />
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

function spinner() {
    const spinner = document.createElement('p');
    spinner.classList.add('spinner');
    spinner.style.cssText = `
        fontSize: 20px
    `
    spinner.textContent = "LOADING...";
    search.append(spinner);
}
