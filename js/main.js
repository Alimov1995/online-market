import findElement from "./utils/findElement.js";
const BASE_URL = "https://63d9f97db28a3148f67c656b.mockapi.io";

const elSelect = findElement("#select");
const elSearch = findElement("#search");

let products = [];

// render post

const templateProduct = findElement("#product-template");
const elCard = findElement(".cards");

function renderProduct(array, parent = elCard) {
  parent.textContent = "";
  const fragment = document.createDocumentFragment();
  array.forEach((product) => {
    const template = templateProduct.content.cloneNode(true);
    const title = findElement(".card-title", template);
    const img = findElement(".card-img-top", template);
    const date = findElement(".date", template);
    const category = findElement(".category", template);
    const description = findElement(".description", template);
    const price = findElement(".price", template);
    const rating = findElement(".rating", template);
    const ratiCount = findElement(".rating-count", template);
    const ratingFull = findElement(".rating-full", template);
    const ratingHalf = findElement(".rating-half", template);
    const ratingStars = findElement(".rating-stars", template);

    // date genered

    const generedDate = new Date(product.createdAt);
    const resultDate = `${
      generedDate.getHours() < 10
        ? "0" + generedDate.getHours()
        : generedDate.getHours()
    }:${
      generedDate.getMinutes() < 10
        ? "0" + generedDate.getMinutes()
        : generedDate.getMinutes()
    } ${
      generedDate.getDate() < 10
        ? "0" + generedDate.getDate()
        : generedDate.getDate()
    }.${
      generedDate.getMonth() + 1 < 10
        ? "0" + (generedDate.getMonth() + 1)
        : generedDate.getMonth() + 1
    }.${generedDate.getFullYear()}`;

    //rating function

    if (Math.round(product.rating) === 5) {
      for (let i = 0; i < 5; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
    } else if (Math.round(product.rating) === 4) {
      for (let i = 0; i < 4; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
    } else if (Math.round(product.rating) === 3) {
      for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
    } else if (Math.round(product.rating) === 2) {
      for (let i = 0; i < 2; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
    } else if (Math.round(product.rating) === 1) {
      const img = document.createElement("img");
      img.src = ratingFull.src;
      ratingStars.appendChild(img);
    }

    title.textContent = product.name;
    img.src = product.image;
    date.textContent = resultDate;
    category.textContent = product.category;
    description.textContent = product.description;
    price.textContent = product.price + "$";
    rating.textContent = product.rating;
    fragment.appendChild(template);
  });
  parent.appendChild(fragment);
}

async function getData() {
  const res = await fetch(BASE_URL + "/products");

  let data = await res.json();
  products = data;
  renderProduct(products);
  rederSelect(products, elSelect);
}
getData();

// select function

elSelect.addEventListener("change", () => {
  const type = elSelect.value;
  let filterArr = [];
  if (type == "All select") {
    renderProduct(products);
  } else {
    for (let i = 0; i < products.length; i++) {
      const element = products[i];

      if (element.category == type) {
        filterArr.push(element);
      }
    }

    renderProduct(filterArr);
  }
});

function rederSelect(productsArr, p) {
  let productsIdArr = [];

  productsArr.forEach((i) => {
    if (!productsIdArr.includes(i.category)) {
      productsIdArr.push(i.category);
    }
  });
  productsIdArr.forEach((elem) => {
    let elOption = document.createElement("option");
    elOption.value = elem;
    elOption.textContent = elem;
    p.appendChild(elOption);
  });
}
rederSelect(products, elSelect);

import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";

const swiper = new Swiper(".swiper", {
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// search

elSearch.addEventListener("input", (e) => {
  e.preventDefault();

  let element = e.target;
  let searchArr = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].name.includes(element.value)) {
      searchArr.push(products[i]);
    }
  }
  renderProduct(searchArr);
});
