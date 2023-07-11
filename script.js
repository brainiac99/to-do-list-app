"use strict";

const newTodo = document.querySelector(".new-todo");
const todo = [];
const toBeRemoved = [];
const addNew = document.querySelector(".add-new");
const todoList = document.querySelector(".list");

const btnClear = document.querySelector(".clear");

const sortBtns = document.querySelectorAll(".sort > button");
const sortAll = document.querySelector(".sort-all");
const sortActive = document.querySelector(".sort-active");
const sortCompleted = document.querySelector(".sort-completed");
let currentAssortment = document.querySelector(".current-assortment");

const count = document.querySelector(".items-left");

const theme = document.querySelector(".theme");

const updateCount = function () {
  count.textContent = `${
    todo.filter((el) => !el.querySelector("input[type='checkbox']").checked)
      .length
  } items left`;
};

const addTodo = function () {
  if (newTodo.value) {
    const html = `<li draggable="true">
    <input type="checkbox" />
    <p>${newTodo.value}</p>
    <button class="delete">
    <img src="./images/icon-cross.svg" alt="delete todo" />
    </button>
    </li>`;

    todoList.insertAdjacentHTML("afterbegin", html);
    newTodo.value = "";
    todo.push(todoList.querySelector("li"));
  }
  updateCount();
};

const deleteTodo = function (el) {
  todo.splice(index, 1);
  el.style.transform = "translateX(-1000%)";
  setTimeout(() => {
    el.remove();
  }, 500);
};

addNew.addEventListener("click", addTodo);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTodo();
});

todoList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI" || e.target.tagName === "P") {
    let currentState = e.target
      .closest("li")
      .querySelector("input[type='checkbox']").checked;
    e.target.closest("li").querySelector("input[type='checkbox']").checked =
      !currentState;
    currentState = !currentState;
  } else if (e.target.tagName === "IMG") {
    const btn = e.target.closest("li");
    const index = todo.indexOf(btn);
    todo.splice(index, 1);
    btn.style.transform = "translateX(-500%)";
    setTimeout(() => {
      btn.remove();
    }, 500);
  }
  updateCount();
});

btnClear.addEventListener("click", () => {
  todo.forEach((el) => {
    const checked = el.querySelector("input[type='checkbox']").checked;
    console.log(checked);
    if (checked) {
      const index = todo.indexOf(el);
      toBeRemoved.push(index);
      el.style.transform = "translateX(-500%)";
      setTimeout(() => {
        el.remove();
      }, 500);
    }
  });
  toBeRemoved.reverse().forEach((i) => {
    todo.splice(i, 1);
  });
  updateCount();
});

sortBtns.forEach((button) =>
  button.addEventListener("click", () => {
    currentAssortment.classList.remove("current-assortment");
    button.classList.add("current-assortment");
    currentAssortment = button;
  })
);

sortAll.addEventListener("click", () => {
  todo.forEach((el) => el.classList.remove("hidden-list"));
});

sortActive.addEventListener("click", () => {
  todo.forEach((el) => {
    el.classList.remove("hidden-list");
    if (el.querySelector(`input[type="checkbox"]`).checked)
      el.classList.add("hidden-list");
  });
});

sortCompleted.addEventListener("click", () => {
  todo.forEach((el) => {
    el.classList.remove("hidden-list");
    if (!el.querySelector(`input[type="checkbox"]`).checked)
      el.classList.add("hidden-list");
  });
});

theme.addEventListener("click", () => {
  theme.querySelectorAll("img").forEach((el) => el.classList.toggle("hidden"));
  document.querySelector("body").classList.toggle("dark");
  document.querySelector("body").classList.toggle("light");
});
