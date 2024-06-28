let textInput = document.querySelector(".textInput");
let pendingList = document.querySelector(".pendingList");
let completedList = document.querySelector(".completedList");
let addBtn = document.querySelector("#addBtn");
let clearBtn = document.querySelector("#clearBtn");
let moveToCompletedBtn = document.querySelector("#moveToCompletedBtn");
let deletePendingBtn = document.querySelector("#deletePendingBtn");
let deleteCompletedBtn = document.querySelector("#deleteCompletedBtn");

let langText = document.querySelector(".langText");

let yearText = document.querySelector("#year");

let cntHeader = document.querySelector(".cntHeader");

// get data from local storage
let PendingStorage = localStorage.getItem("pending");
let PendingData = JSON.parse(PendingStorage) || [];
//
let CompletedStorage = localStorage.getItem("completed");
let CompletedData = JSON.parse(CompletedStorage) || [];

// this functions will be called when page loads
WelcomeMessage();
ShowPending();
ShowCompleted();
checkYear();

function setToCompletedStorage(arr) {
  localStorage.setItem("completed", JSON.stringify(arr));
}
function setToStorage(array) {
  localStorage.setItem("pending", JSON.stringify(array));
}

function getCompletedFromStorage() {
  return JSON.parse(localStorage.getItem("completed")) || [];
}

function getPendingFromStorage() {
  return JSON.parse(localStorage.getItem("pending")) || [];
}

function addToList(item) {
  if (!item) {
    alert("Please enter a task");
  } else {
    let array = getPendingFromStorage();
    array.push(item);
    console.log(array);
    setToStorage(array);
    textInput.value = "";
    ShowPending();
  }
}

function removeFromList(index) {
  let array = getPendingFromStorage();
  array.splice(index, 1);
  setToStorage(array);
  ShowPending();
}

function removeFromCompleted(index) {
  let confirmation = confirm(
    "Are you sure you want to delete this completed item?"
  );

  if (confirmation) {
    let array = getCompletedFromStorage();
    array.splice(index, 1);
    setToCompletedStorage(array);
    ShowCompleted();
  } else {
    return;
  }
}

function addToCompletedList(index, item) {
  let array = getCompletedFromStorage();
  console.log(array);
  array.push(item);
  setToCompletedStorage(array);
  removeFromList(index);
  ShowCompleted();
}

function ShowPending() {
  let array = getPendingFromStorage();
  pendingList.innerHTML = "";
  array.forEach((item, index) => {
    pendingList.innerHTML += `
  <div class="listItem">
        <p class="roboto-regular-italic">${item}</p>
        <div class="listIcons">
            <i id="deletePendingBtn" onclick="removeFromList(${index})" class="bx bx-x-circle"></i>
            <i id="moveToCompletedBtn" onclick="addToCompletedList(${index}, '${item}')" class="bx bx-chevron-down-circle"></i>
        </div>
    </div>`;
  });
}

function ShowCompleted() {
  let array = getCompletedFromStorage();
  completedList.innerHTML = "";
  array.forEach((item, index) => {
    completedList.innerHTML += `
      <div class="listItem">
            <p class="roboto-regular-italic">${item}</p>
            <div class="listIcons">
                <i id="deleteCompletedBtn" onclick="removeFromCompleted(${index})" class="bx bx-x-circle"></i>
            </div>
        </div>`;
  });
}

function checkYear() {
  let year = new Date().getFullYear();
  if (year === 2024) {
    yearText.innerHTML = "";
  } else {
    yearText.innerHTML = year;
  }
}

function WelcomeMessage() {
  let hour = new Date().getHours();
  let text = langText.innerHTML;

  if (text === "AZ") {
    if (hour < 12) {
      cntHeader.innerHTML = "<span>Good</span>  Morning";
    } else if (hour < 18) {
      cntHeader.innerHTML = "<span>Good</span> Afternoon";
    } else {
      cntHeader.innerHTML = "<span>Good</span> Evening";
    }
  } else if (text === "EN") {
    if (hour < 12) {
      cntHeader.innerHTML = "<span>Sabahınız</span>  Xeyir";
    } else if (hour < 18) {
      cntHeader.innerHTML = "<span>Günortanız</span>  Xeyir";
    } else {
      cntHeader.innerHTML = " <span>Axşamınız</span> Xeyir";
    }
  }
}

addBtn.addEventListener("click", () => {
  addToList(textInput.value);
});

clearBtn.addEventListener("click", () => {
  textInput.value = "";
});

moveToCompletedBtn.addEventListener("click", () => {
  addToCompletedList();
});
