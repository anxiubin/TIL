const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pending = document.querySelector(".ul-pending"),
  finished = document.querySelector(".ul-finished");

const PENDING_LS = "PENDING",
  FINISHED_LS = "FINISHED";

let pendingArr = [],
  finishedArr = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  if (li.parentNode.className === "ul-pending") {
    pending.removeChild(li);
    const cleanPending = pendingArr.filter(function(todo) {
      return todo.id !== Number(li.id);
    });
    pendingArr = cleanPending;
  } else if (li.parentNode.className === "ul-finished") {
    finished.removeChild(li);
    const cleanFinshed = finishedArr.filter(function(todo) {
      return todo.id !== Number(li.id);
    });
    finishedArr = cleanFinshed;
  }

  saveToDos();
}

function finishedToDo(event) {
  let btn = event.target;
  const finLi = btn.parentNode;
  if (finLi.parentNode.className === "ul-pending") {
    finished.appendChild(finLi);
    btn.innerText = "🔄";
    const text = finLi.querySelector("span").textContent;
    const cleanPending = pendingArr.filter(function(todo) {
      return todo.id !== Number(finLi.id);
    });
    pendingArr = cleanPending;
    const finishedObj = {
      text: text,
      id: Number(finLi.id)
    };
    finishedArr.push(finishedObj);
    saveToDos();
  } else if (finLi.parentNode.className === "ul-finished") {
    pending.appendChild(finLi);
    btn.innerText = "✅";
    const text = finLi.querySelector("span").textContent;
    const cleanFinished = finishedArr.filter(function(todo) {
      return todo.id !== Number(finLi.id);
    });
    finishedArr = cleanFinished;
    const pendingObj = {
      text: text,
      id: Number(finLi.id)
    };
    pendingArr.push(pendingObj);
    saveToDos();
  }
}

function saveToDos() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingArr));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedArr));
}

function printPend(text, id) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  span.innerText = text;
  delBtn.innerText = "❌";
  finBtn.innerText = "✅";
  delBtn.addEventListener("click", deleteToDo);
  finBtn.addEventListener("click", finishedToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = id;
  pending.appendChild(li);
  const pendingObj = {
    text: text,
    id: id
  };
  pendingArr.push(pendingObj);
  saveToDos();
}

function printFin(text, id) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backbtn = document.createElement("button");
  const span = document.createElement("span");
  span.innerText = text;
  delBtn.innerText = "❌";
  backbtn.innerText = "🔄";
  delBtn.addEventListener("click", deleteToDo);
  backbtn.addEventListener("click", finishedToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backbtn);
  li.id = id;
  finished.appendChild(li);
  const finishedObj = {
    text: text,
    id: id
  };
  finishedArr.push(finishedObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  const newID = Date.now(); //또는 Math.random 사용
  printPend(currentValue, newID);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedPending !== null && loadedFinished !== null) {
    const parsedPend = JSON.parse(loadedPending);
    const parsedFin = JSON.parse(loadedFinished);
    parsedPend.forEach(function(todo) {
      printPend(todo.text, todo.id);
    });
    parsedFin.forEach(function(todo) {
      printFin(todo.text, todo.id);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

// localStorage.setItem(pending, obj);
// localStorage.setItem(finished, obj);
// pending -> delbtn & finbtn
// finbtn -> pending에서 사라지는 동시에 finished로 가고 fin local에저장되고
// finbtn은 backbtn으로 전환
// finished -> delbtn & backbtn
// backbtn -> finishe에서 사라지는 동시에 pending으로가고 pending local에 저장
