const templateFragment = document.querySelector('.template-offer').content;
const template = templateFragment.querySelector('.offer');

const renderCard = (card) => {
  const articleElement = template.cloneNode(true);

  const headerElement = articleElement.querySelector('.offer__header');
  const priceElement = articleElement.querySelector('.offer__price');
  const logoElement = articleElement.querySelector('.offer__logo');
  
  const bodyElement = articleElement.querySelector('.offer__list');
  const lineElement = articleElement.querySelector('.offer__list-item');

  const routeValueElement = articleElement.querySelector('.offer__route-value');
  const routeTimeElement = articleElement.querySelector('.offer__route-time');
  const durationValueElement = articleElement.querySelector('.offer__duration-value');
  const transferCountElement = articleElement.querySelector('.offer__transfer-count');
  const transferValueElement = articleElement.querySelector('.offer__transfer-value');





  
  // offer.features
  const featuresArray = card.offer.features;

  if (featuresArray) {
    featuresListElement.forEach((feature) => {
      if (!featuresArray.includes(feature.dataset.type)) {
        feature.remove();
      }
    });
  } else {
    featuresContainerElement.innerHTML = '';
  }

  // offer.type
  const typeEng = card.offer.type || '';
  typeElement.textContent = translateType[typeEng] || '';

  // offer.photos
  const photosArray = card.offer.photos;
  photosContainerElement.innerHTML = '';
  if (photosArray) {
    photosArray.forEach((photo) => {
      const clonedPhotoElement = photoElement.cloneNode(true);
      photosContainerElement.insertAdjacentElement('beforeend', clonedPhotoElement);
      clonedPhotoElement.src = photo;
    });
  }

  titleElement.textContent = card.offer.title || '';
  priceElement.textContent = card.offer.address || '';
  priceElement.innerHTML = card.offer.price ? `${card.offer.price  }<span>₽/ночь</span>` : '';
  bodyElement.textContent = card.offer.rooms && card.offer.guests ? `${card.offer.rooms} комнаты для ${card.offer.guests} гостей` : '';
  firstLineElement.textContent = card.offer.checkin && card.offer.checkout ? `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}` : '';
  descriptionElement.textContent = card.offer.description || '';
  avatarElement.src = card.author.avatar ? card.author.avatar : avatarElement.style.display = 'none';

  return articleElement;
};

export {createCustomCard};