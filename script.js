"use strict";

// DOM Elements
const btnAdd = document.querySelector("#add-btn");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const todoList = document.querySelector("#todo-list");
const tabContainer = document.querySelector("#tabs");
const tabs = document.querySelectorAll(".tab-button");

// Default tasks
let defaultTasks = [
  ["Wake up at 5", true],
  ["Take a cold shower", true],
  ["Meditate for 10 minutes", false],
  ["Make breakfast", false],
  ["Practice Coding", false],
];

// Tasks array
let tasks = [...defaultTasks];

// Local Storage Functions
const addToLocalStorage = function (tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Task Modification Functions
const addTask = function (task) {
  tasks.push([task, false]);
  addToLocalStorage(tasks);
  renderList();
};

const deleteTask = function (index) {
  tasks.splice(index, 1);
  addToLocalStorage(tasks);
  renderList();
};

const toggleTask = function (index) {
  tasks[index][1] = !tasks[index][1];
  addToLocalStorage(tasks);
  renderList();
};

// Form Submission Handler
const handleFormSubmit = function (event) {
  event.preventDefault();

  const taskValue = taskInput.value.trim();
  if (taskValue !== "") {
    addTask(taskValue);
    taskInput.value = "";
  }
};

// Render Functions
const renderList = function () {
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = "task";
    listItem.innerHTML = `
      <input type="checkbox" ${task[1] ? "checked" : ""} />
      ${task[0]}
      <button class="delete-btn">Delete</button>
    `;
    listItem
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteTask(index));
    listItem
      .querySelector("input[type='checkbox']")
      .addEventListener("change", () => toggleTask(index));
    todoList.appendChild(listItem);
  });
};

// Initialization
const init = function () {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  } else {
    addToLocalStorage(defaultTasks);
  }

  renderList();
};

// Event Listeners
btnAdd.addEventListener("click", handleFormSubmit);
taskForm.addEventListener("submit", handleFormSubmit);

// Initial Setup
init();
