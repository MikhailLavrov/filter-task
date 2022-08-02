const templateFragment=document.querySelector(".template-offer").content,template=templateFragment.querySelector(".offer"),renderCard=e=>{const t=template.cloneNode(!0),r=(t.querySelector(".offer__header"),t.querySelector(".offer__price")),o=(t.querySelector(".offer__logo"),t.querySelector(".offer__list")),n=(t.querySelector(".offer__list-item"),t.querySelector(".offer__route-value"),t.querySelector(".offer__route-time"),t.querySelector(".offer__duration-value"),t.querySelector(".offer__transfer-count"),t.querySelector(".offer__transfer-value"),e.offer.features);n?featuresListElement.forEach((e=>{n.includes(e.dataset.type)||e.remove()})):featuresContainerElement.innerHTML="";const f=e.offer.type||"";typeElement.textContent=translateType[f]||"";const a=e.offer.photos;return photosContainerElement.innerHTML="",a&&a.forEach((e=>{const t=photoElement.cloneNode(!0);photosContainerElement.insertAdjacentElement("beforeend",t),t.src=e})),titleElement.textContent=e.offer.title||"",r.textContent=e.offer.address||"",r.innerHTML=e.offer.price?`${e.offer.price}<span>₽/ночь</span>`:"",o.textContent=e.offer.rooms&&e.offer.guests?`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`:"",firstLineElement.textContent=e.offer.checkin&&e.offer.checkout?`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`:"",descriptionElement.textContent=e.offer.description||"",avatarElement.src=e.author.avatar?e.author.avatar:avatarElement.style.display="none",t};export{createCustomCard};