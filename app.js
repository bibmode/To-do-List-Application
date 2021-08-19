"use strict";

// sortable list
let items = document.querySelectorAll(".list__item");
let el = document.getElementById("items");

new Sortable(el, {
  animation: 350,
  chosenClass: "sortable-chosen",
  dragClass: "sortable-drag",
});

//adding new item in list
const inputField = document.querySelector(".input__field");
const inputBtn = document.querySelector(".input__button");
const listItem = document.querySelector("#list-item");

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

  //adding clone to DOM
  listItem.after(clone);
  console.log(clone.childNodes);

  //adding event listener to label
  clone.childNodes[3].addEventListener("click", completed);

  num++;
  inputField.value = "";
}

//completed state
function completed(e) {
  const parent = e.target.parentElement;
  const words = e.target.parentElement.childNodes[5];
  const checkbox = e.target.parentElement.childNodes[1];

  if (checkbox.checked) {
    words.classList.remove("completed");
    parent.classList.add("active");
    //for check only for active or inactivity
    console.log(parent.classList);
  }
  if (!checkbox.checked) {
    words.classList.add("completed");
    parent.classList.remove("active");
    //for check only for active or inactivity
    console.log(parent.classList);
  }
}
