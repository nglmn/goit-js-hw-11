import{i as m,S as p}from"./assets/vendor-46aac873.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const f="Sorry, there are no images matching<br> your search query. Please try again!",d={title:"Error",message:f,messageSize:"16px",position:"topRight",theme:"dark",backgroundColor:"#EF4040",color:"#ffffff"},g="https://pixabay.com/api/",h="41991233-e464ef3fed32efbb52a55d5bb",y=`${g}?key=${h}`;function b(o){const s=new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15});return fetch(`${y}&q=${o}&${s}`).then(i=>{if(!i.ok)throw new Error(i.status);return i.json()})}const l=document.querySelector(".form"),L=document.querySelector(".gallery"),a=document.querySelector("#loader");function $({hits:o}){const s=o.map(({webformatURL:i,largeImageURL:r,likes:e,tags:t,views:n,comments:c,downloads:u})=>`
                <li class="gallery-item">
                    <a class="gallery-link" href="${r}">
                        <img
                            class="gallery-image"
                            src="${i}"
                            alt="${t}"/>
                        <ul class="descriptions">
                            <li class="description-item">
                                <p class="name">Likes</p>
                                <p class="count">${e}</p>
                            </li>
                            <li class="description-item">
                                <p class="name">Viewes</p>
                                <p class="count">${n}</p>
                            </li>
                            <li class="description-item">
                                <p class="name">Comments</p>
                                <p class="count">${c}</p>
                            </li>
                            <li class="description-item">
                                <p class="name">Downloads</p>
                                <p class="count">${u}</p>
                            </li>
                        </ul>
                    </a>
                </li>
            `).join("");L.insertAdjacentHTML("afterbegin",s)}l.addEventListener("submit",o=>{o.preventDefault(),a.classList.add("loader");const s=l.elements.input.value;b(s).then(r=>{r.hits.length!=0?$(r):m.error(d),a.classList.remove("loader"),S()}).then(()=>console.log(l.children)).catch(r=>console.log(r)),document.querySelectorAll(".gallery-item").forEach(r=>r.remove()),l.reset()});function S(){let o=new p(".gallery a",{captionsData:"alt",captionsPosition:"bottom",captionsDelay:250});return o.show(),o.refresh(),o}
//# sourceMappingURL=commonHelpers.js.map
