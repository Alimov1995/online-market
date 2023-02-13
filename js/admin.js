import findElement from "./utils/findElement.js";
const BASE_URL = "https://63d9f97db28a3148f67c656b.mockapi.io";

const elSelect = findElement("#select");
const elSearch = findElement("#search");

let products = [];

// render post

const templateProduct = findElement("#product-template");
const elCard = findElement(".cards");
const elForm = findElement("#add-product");
const editForm = findElement("#editeForm");

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
    const deleteBtn = findElement(".btn-outline-danger", template);
    const editBtn = findElement(".btn-outline-info", template);

    deleteBtn.dataset.id = product.id;
    editBtn.dataset.id = product.id;

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

function getData() {
  async function getData() {
    const res = await fetch(BASE_URL + "/products");

    let data = await res.json();
    products = data;
    renderProduct(products);
  }
  getData();
}
getData();

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const image = evt.target.image.value;
  const category = evt.target.category.value;
  const price = evt.target.price.value;
  const rating = evt.target.rating.value;
  const description = evt.target.description.value;

  const newProduct = {
    name,
    image,
    category,
    rating,
    price,
    description,
  };

  fetch(BASE_URL + "/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
  })
    .then((res) => res.json)
    .then((data) => {
      console.log(data);
      alert("mahsulot qo'shildi");
      getData();
      elForm.reset();
    })
    .catch((err) => {
      alert("xato qaytadan urinib koring");
    });
});

// select function

// elSelect.addEventListener("change", () => {
//   const type = elSelect.value;
//   let filterArr = [];
//   if (type == "All select") {
//     renderProduct(products);
//   } else {
//     for (let i = 0; i < products.length; i++) {
//       const element = products[i];

//       if (element.category == type) {
//         filterArr.push(element);
//       }
//     }

//     renderProduct(filterArr);
//   }
// });

// function rederSelect(productsArr, p) {
//   let productsIdArr = [];

//   productsArr.forEach((i) => {
//     if (!productsIdArr.includes(i.category)) {
//       productsIdArr.push(i.category);
//     }
//   });
//   productsIdArr.forEach((elem) => {
//     let elOption = document.createElement("option");
//     elOption.value = elem;
//     elOption.textContent = elem;
//     p.appendChild(elOption);
//   });
// }
// rederSelect(products, elSelect);

//delete function

elCard.addEventListener("click", (evt) => {
  if (evt.target.className.includes("btn-outline-danger")) {
    const id = evt.target.dataset.id;

    fetch(BASE_URL + "/products/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        getData();
      })
      .catch((err) => {});
  }
});

//Add function

elCard.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.className.includes("btn-outline-info")) {
    const id = target.dataset.id;
    products.forEach((product) => {
      if (product.id === id) {
        const image = editForm.image;
        const title = editForm.title;
        const category = editForm.category;
        const description = editForm.description;
        const price = editForm.price;
        const rating = editForm.rating;
        const editImg = findElement("#editImage");
        const saveBtn = findElement("#saveBtn");

        editImg.src = product.image;
        image.alt = product.name;

        image.value = product.image;
        title.value = product.name;
        category.value = product.category;
        description.value = product.description;
        price.value = product.price;
        rating.value = product.rating;

        saveBtn.addEventListener("click", () => {
          const newObject = {
            id: product.id,
            image: image.value,
            name: title.value,
            category: category.value,
            description: description.value,
            price: price.value,
            rating: rating.value,
          };

          fetch(BASE_URL + "/products/" + id, {
            method: "PUT",
            body: JSON.stringify(newObject),

            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              getData();
            })
            .catch((err) => {});
        });
      }
    });
  }
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
