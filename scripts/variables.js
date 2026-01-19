const colors = [
  "#ff7a00",
  "#ff5eb3",
  "#5848e6",
  "#9327ff",
  "#00bee8",
  "#1fd7c1",
  "#c37fed",
  "#4eefac",
  "#fc71ff",
  "#ffc800",
  "#0038ff",
  "#7Ae229",
  "#ffdc2f",
  "#ff3d00",
  "#ffa800", 
]

let colorIndex = 0;


// FIREBASE
const BASE_URL = "https://join-f5da0-default-rtdb.europe-west1.firebasedatabase.app/";


// GET DATA
let contactsList = [];
let taskList = [];


// SIGN UP
const ICONS = {
  LOCK: './assets/img/lock_icon.svg',
  OFF: './assets/img/visibility_off.svg',
  ON: './assets/img/visibility.svg'
};


// BOARD
let currentDraggedElementIndex;
let currentDraggedElementID;
let prefillAssigneeCheckbox = [];


// ADD TASK
// const subtaskInput = document.getElementById("subtasks");
// const subtaskInputEdit = document.getElementById("subtasks_edit"); // New
// const subtaskList = document.getElementById("subtaskList");
// const subtaskListEdit = document.getElementById("subtaskList_edit"); // New
// const subtaskActions = document.querySelector(".subtask_actions");

// const priorities = [
//   { name: "urgent", color: "red" },
//   { name: "medium", color: "yellow" },
//   { name: "low", color: "green" },
// ];

// let selectedAssignees = [];
// let selectedAssigneesEdit = [];