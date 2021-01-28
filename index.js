const imageContainer = document.getElementById('image-container');
const imageTitle = document.getElementById('image-title');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash APi
const portrait = 'orientation/portrait/';
const count = 5;
const apiKey = 'wAf6QX1qDg21cGI2QkyoYV3KoBS8abULJJt_iYnVaxU';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&portrait=${portrait}&count=${count}`;

//Check if all images are loaded

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

//Helper Function to set attributes on dom Elements

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create elements for link and photos, add to Dom

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    //create anchor element to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      taget: '_blank',
    });

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when image loaded
    img.addEventListener('load', imageLoaded);
    //Put <img> inside <a> and the put both inside imageContainer element

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash Api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch error here
  }
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
