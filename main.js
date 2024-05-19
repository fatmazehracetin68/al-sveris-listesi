let editFlag = false;
let editElement;
let editId = "";
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

//fonksiyonlar

const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
};

const setBackToDefoult = () => {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "Ekle";
};

const addItem = (event) => {
  event.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = ` <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>`;

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
    list.appendChild(element);
    displayAlert("Başarıyla Eklenildi", "success");

    setBackToDefoult();
    addToLocalStoroge(id, value);
  } else if (value !== "" && editFlag) {
    editElement.innerText = value;
    displayAlert("Başarıyla Güncellendi", "success");
    editLocalStore(editId, value);
    setBackToDefoult();
  }
};

const deleteItem = (event) => {
  const element = event.target.parentElement.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  displayAlert("Başarıyla kaldırıldı", "danger");
  removeFromLOcalStroge(id);
};

const editItem = (event) => {
  const element = event.target.parentElement.parentElement.parentElement;
  editElement = event.target.parentElement.parentElement.previousElementSibling;
  grocery.value = editElement.innerText;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "Düzenle";
};

const clearItems = () => {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => list.removeChild(item));
  }

  displayAlert("Liste Boş", "danger");
  localStorage.removeItem("list");
};

const addToLocalStoroge = (id, value) => {
  const grocery = { id, value };
  let items = getLocalStroge();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
};

function getLocalStroge() {
  const _list = localStorage.getItem("list");
  return _list ? JSON.parse(_list) : [];
}

const removeFromLOcalStroge = (id) => {
  let items = getLocalStroge();
  items = items.filter((item) => item.id !== id);
  localStorage.setItem("list", JSON.stringify(items));
};

const editLocalStore = (id, value) => {
  let items = getLocalStroge();

  items = items.map((item) => {
    if ((item.id = id)) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
};

const createListItem = (id, value) => {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = ` <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>`;

  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);
  list.appendChild(element);
};
const setupItems = () => {
  let items = getLocalStroge();

  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
  }
};
//olay izleyicileri
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);
