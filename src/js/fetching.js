

const URL = 'https://pixabay.com/api/';
const API_KEY = '41991233-e464ef3fed32efbb52a55d5bb';

const fullAddres = `${URL}?key=${API_KEY}`;

export function fetchGallery(userRequest) {
    const searchingParameters = new URLSearchParams({
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
    })
    return fetch(`${fullAddres}&q=${userRequest}&${searchingParameters}`)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error(responce.status)
            }
            return responce.json();
        })
}
