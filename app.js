"use strict";

/////////////////////
//change theme
const themeBtn = document.querySelector("#switch");
const headSwitch = document.querySelector(".heading__switch");
const backgroundImage = document.querySelector(".bg-image");

const phone = window.matchMedia("(max-width: 790px)");
const desktop = window.matchMedia("(min-width: 791px)");

themeBtn.addEventListener("click", (e) => {
  if (themeBtn.checked === true) {
    document.body.setAttribute("data-theme", "light");
    headSwitch.style.backgroundImage = 'url("../images/icon-moon.svg")';
  } else {
    document.body.setAttribute("data-theme", "");
    headSwitch.style.backgroundImage = 'url("../images/icon-sun.svg")';
  }
});

////////////////////
// sortable list
let items = document.querySelectorAll(".list__item");
let el = document.getElementById("items");

new Sortable(el, {
  animation: 350,
  chosenClass: "sortable-chosen",
  dragClass: "sortable-drag",
});

//////////////////////
//adding new item in list
const inputField = document.querySelector(".input__field");
const inputBtn = document.querySelector(".input__button");
const listItem = document.querySelector("#list-item");

const itemsNum = document.querySelector(".items__num");
const menu = document.querySelector(".items__menu");

let itemsLeft = Number(itemsNum.innerText);
let num = 1;

inputField.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) addNewItem(inputField.value, num);
});

function addNewItem(str, digit) {
  const clone = listItem.cloneNode(true);
  clone.childNodes[5].innerHTML = str;
  clone.classList.remove("hidden");

  clone.childNodes[1].id = `item-${digit}`;
  clone.childNodes[3].htmlFor = `item-${digit}`;

  //add event listener to close btn
  clone.childNodes[7].addEventListener("click", removeItem);

  //adding clone to DOM
  listItem.after(clone);

  //adding event listener to label
  clone.childNodes[3].addEventListener("click", completed);

  num++, itemsLeft++;
  itemsNum.innerText = itemsLeft;
  inputField.value = "";

  items = document.querySelectorAll(".list__item");
  addCurve(items);

  //remove top curve of menu
  if (menu.classList.contains("border-curve-all"))
    menu.classList.remove("border-curve-all");
}

///////////////////////
//completed state
function completed(e) {
  const parent = e.target.parentElement;
  const words = e.target.parentElement.childNodes[5];
  const checkbox = e.target.parentElement.childNodes[1];

  if (checkbox.checked) {
    words.classList.remove("completed");
    parent.classList.add("active");

    itemsLeft++;
    itemsNum.innerText = itemsLeft;
  }
  if (!checkbox.checked) {
    words.classList.add("completed");
    parent.classList.remove("active");

    if (itemsLeft > 0) itemsLeft--;
    itemsNum.innerText = itemsLeft;
  }
}

////////////////////////
//removing item
//adding event listener to btn
function removeItem(e) {
  const parentDiv = e.target.parentElement;

  if (itemsLeft !== 0 && parentDiv.classList.contains("active")) itemsLeft--;
  itemsNum.innerText = itemsLeft;

  parentDiv.remove();

  //add border radius to menu if all items are deleted
  const listItemAll = document.querySelectorAll(".list__item");
  if (listItemAll.length === 1) menu.classList.add("border-curve-all");
}

/////////////////
//filtering

const allBtn = document.querySelector(".items__all");
const activeBtn = document.querySelector(".items__active");
const completedBtn = document.querySelector(".items__completed");

const allBtn2 = document.querySelector(".items__all--2");
const activeBtn2 = document.querySelector(".items__active--2");
const completedBtn2 = document.querySelector(".items__completed--2");

const clearBtn = document.querySelector(".items__clear");

let allItems;

//adding event listeners
allBtn.addEventListener("click", showAll);
activeBtn.addEventListener("click", showActive);
completedBtn.addEventListener("click", showCompleted);
allBtn2.addEventListener("click", showAll);
activeBtn2.addEventListener("click", showActive);
completedBtn2.addEventListener("click", showCompleted);
clearBtn.addEventListener("click", clearCompleted);

function showActive() {
  showAll();
  let arr = [];
  allItems = document.querySelectorAll(".list__item");

  for (let i = 1; i < allItems.length; i++) {
    if (!allItems[i].classList.contains("active")) {
      allItems[i].classList.add("hidden");
    } else {
      arr.push(allItems[i]);
    }
  }

  if (arr.length > 0) borderCurve(arr[0]);
}

function showCompleted() {
  showAll();
  let arr = [];
  allItems = document.querySelectorAll(".list__item");

  for (let i = 1; i < allItems.length; i++) {
    if (allItems[i].classList.contains("active")) {
      allItems[i].classList.add("hidden");
    } else {
      arr.push(allItems[i]);
    }
  }
  if (arr.length > 0) borderCurve(arr[0]);
}

function clearCompleted() {
  let arr = [];
  allItems = document.querySelectorAll(".list__item");

  for (let i = 1; i < allItems.length; i++) {
    if (!allItems[i].classList.contains("active")) {
      allItems[i].remove();
    } else {
      arr.push(allItems[i]);
    }
  }

  if (arr.length > 0) borderCurve(arr[0]);
}

function showAll() {
  allItems = document.querySelectorAll(".list__item");

  for (let i = 1; i < allItems.length; i++) {
    if (allItems[i].classList.contains("hidden")) {
      allItems[i].classList.remove("hidden");
    }
  }

  if (allItems.length > 1) borderCurve(allItems[1]);
}

function addCurve(allItems) {
  for (let i = 1; i < allItems.length; i++) {
    if (allItems[i].classList.contains("border-curve")) {
      allItems[i].classList.remove("border-curve");
    }
    if (i === 1) {
      allItems[i].classList.add("border-curve");
    }
  }
}

function borderCurve(item) {
  item.classList.add("border-curve");
}
