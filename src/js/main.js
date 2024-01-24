// Описаний у документації
import iziToast from "izitoast";
import { iziToastError } from "./custom_iziToast";


const form = document.querySelector('.form');
const input = document.querySelector('.responce-input');
const gallery = document.querySelector('.image-gallery');



const URL = 'https://pixabay.com/api/';
const API_KEY = '41991233-e464ef3fed32efbb52a55d5bb';

const fullAddres = `${URL}?key=${API_KEY}`;


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userRequest = form.elements.input.value;

    fetchGallery(userRequest)
        .then(data => renderImage(data))
        .catch(error => console.log(error))
})

function fetchGallery(userRequest) {
    const searchParams = new URLSearchParams({
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 9,
    })

    return fetch(`${fullAddres}&q=${userRequest}&${searchParams}`)
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
        .map(({ id, previewURL }) => {
            return `
                <li class="gallery-item">
                    <img src="${previewURL}" id="${id}"/>
                </li>
            `
        }).join("");

    gallery.insertAdjacentHTML('afterbegin', markup);
}
