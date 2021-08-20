"use strict";

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

  //add border curve to latest one
  //addBorder();

  //adding event listener to label
  clone.childNodes[3].addEventListener("click", completed);

  num++, itemsLeft++;
  itemsNum.innerText = itemsLeft;
  inputField.value = "";

  items = document.querySelectorAll(".list__item");
  addCurve(items);
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
}

/////////////////
//filtering

const allBtn = document.querySelector(".items__all");
const activeBtn = document.querySelector(".items__active");
const completedBtn = document.querySelector(".items__completed");
const clearBtn = document.querySelector(".items__clear");

let allItems;

//adding event listeners
allBtn.addEventListener("click", showAll);
activeBtn.addEventListener("click", showActive);
completedBtn.addEventListener("click", showCompleted);
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

  console.log(arr);
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
  addCurve(allItems);
}

function addCurve(allItems) {
  console.log(allItems);
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
