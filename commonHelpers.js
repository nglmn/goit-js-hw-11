import{S as u,i as p}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const f="Sorry, there are no images matching<br> your search query. Please try again!",m={title:"Error",message:f,messageSize:"16px",position:"topRight",theme:"dark",backgroundColor:"#EF4040",color:"#ffffff"},a=document.querySelector(".form"),d=document.querySelector(".search-container"),h=document.querySelector(".gallery"),g="https://pixabay.com/api/",y="41991233-e464ef3fed32efbb52a55d5bb",b=`${g}?key=${y}`;a.addEventListener("submit",s=>{s.preventDefault();const o=a.elements.input.value;L(o).then(t=>{$(t);let n=new u(".gallery a",{captionsData:"alt",captionsPosition:"bottom",captionsDelay:250});n.show(),n.refresh()}).catch(t=>console.log(t)),a.reset()});function L(s){const o=new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15});return fetch(`${b}&q=${s}&${o}`,{method:"GET"}).then(t=>(S(),t)).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()})}function $({hits:s}){if(s.length===0)return p.error(m);const o=s.map(({webformatURL:t,largeImageURL:n,likes:e,tags:r,views:i,comments:l,downloads:c})=>`
                <li class="gallery-item">
                    <a
                        class="gallery-link"
                        href="${n}"
                        >
                        <img
                            class="gallery-image"
                            src="${t}"
                            alt="${r}"
                        />
                        <ul class="descriptions">
                            <li class="description-item">
                                <p class="name">Likes</p>
                                <p class="count">${e}</p>
                            </li>
                            <li class="description-item">
                                <p class="name">Viewes</p>
                                <p class="count">${i}</p>
                            </li>
                            <li class="description-item">
                                <p class="name">Comments</p>
                                <p class="count">${l}</p>
                            </li>
                            <li class="description-item">
                                <p class="name">Downloads</p>
                                <p class="count">${c}</p>
                            </li>
                        </ul>
                        </a>
                </li>
            `).join("");h.insertAdjacentHTML("afterbegin",o)}function S(){const s=document.createElement("p");s.classList.add("spinner"),s.style.cssText=`
        fontSize: 20px
    `,s.textContent="LOADING...",d.append(s)}
//# sourceMappingURL=commonHelpers.js.map
