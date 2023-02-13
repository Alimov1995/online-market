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
    const price = findElement(".price", template);
    const rating = findElement(".rating", template);
    const ratingFull = findElement(".rating-full", template);
    const ratingHalf = findElement(".rating-half", template);
    const ratingStars = findElement(".rating-stars", template);

    //rating function

    if (product.rating <= 5 && product.rating > 4.5) {
      for (let i = 0; i < 5; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
    } else if (product.rating <= 4.5 && product.rating > 4) {
      for (let i = 0; i < 4; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
      const img = document.createElement("img");
      img.src = ratingHalf.src;
      ratingStars.appendChild(img);
    }

    if (product.rating <= 4 && product.rating > 3.5) {
      for (let i = 0; i < 4; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
    } else if (product.rating <= 3.5 && product.rating > 3) {
      for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
      const img = document.createElement("img");
      img.src = ratingHalf.src;
      ratingStars.appendChild(img);
    }

    if (product.rating <= 3 && product.rating > 2.5) {
      for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
    } else if (product.rating <= 2.5 && product.rating > 2) {
      for (let i = 0; i < 2; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
      const img = document.createElement("img");
      img.src = ratingHalf.src;
      ratingStars.appendChild(img);
    }
    if (product.rating <= 2 && product.rating > 1.5) {
      for (let i = 0; i < 2; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
    } else if (product.rating <= 1.5 && product.rating > 1) {
      for (let i = 0; i < 1; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
      const img = document.createElement("img");
      img.src = ratingHalf.src;
      ratingStars.appendChild(img);
    }
    if (product.rating <= 1 && product.rating > 0.5) {
      for (let i = 0; i < 1; i++) {
        const img = document.createElement("img");
        img.src = ratingFull.src;
        ratingStars.appendChild(img);
      }
    } else if (product.rating <= 0.5 && product.rating > 0) {
      const img = document.createElement("img");
      img.src = ratingHalf.src;
      ratingStars.appendChild(img);
    }

    title.textContent = product.name;
    img.src = product.image;
    date.textContent = product.createdAt;
    category.textContent = product.category;
    price.textContent = product.price;
    rating.textContent = product.rating;
    fragment.appendChild(template);
  });
  parent.appendChild(fragment);
}
export default renderProduct;
