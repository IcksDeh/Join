const colors = [
    "#ff7a00",
    "#ff5eb3",
    "#7357ffff",
    "#9327ff",
    "#00bee8",
    "#1fd7c1",
    "#ff745e",
    "#ffb073ff",
    "#fc71ff",
    "#ffc701",
    "#0038ff",
    "#7Ae229",
    "#ffe62b",
    "#ff3d00",
    "#ffa800", 
]

let colorIndex = 0;

// ADD TASK
const subtaskInput = document.getElementById("subtasks");
const subtaskList = document.getElementById("subtaskList");
const subtaskActions = document.querySelector(".subtask_actions");

const priorities = [
  { name: "urgent", color: "red" },
  { name: "medium", color: "yellow" },
  { name: "low", color: "green" },
];

let selectedAssignees = [];

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