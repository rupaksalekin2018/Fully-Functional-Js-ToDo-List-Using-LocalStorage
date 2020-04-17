//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// To show all the data saved in the local storage
showSavedData();

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);

//Functions
function addTodo(event) {
  event.preventDefault();

  let valueOfinput = todoInput.value;

  if (valueOfinput === "" || valueOfinput.length > 15) {
    alert("You can not add empty To Do or more than 10 words at a time");
    return 0;
  }

  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Check Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append to list
  todoList.appendChild(todoDiv);

  //Connecting the Local storage to add the note
  let data = JSON.parse(localStorage.getItem("notes"));
  if (data === null) {
    let newData = [];
    newData.push(todoInput.value);
    localStorage.setItem("notes", JSON.stringify(newData));
  } else {
    data.push(todoInput.value);
    localStorage.setItem("notes", JSON.stringify(data));
  }

  //Clear Todo Input value
  todoInput.value = "";
}

function deletecheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });

    //Connecting the Local storage to remove the note
    let data = JSON.parse(localStorage.getItem("notes"));
    //console.log(data);
    let indexDelete = data.indexOf(todo.innerText);
    // console.log(indexDelete);

    if (indexDelete > -1) {
      let newData = data.splice(indexDelete, 1);
      localStorage.setItem("notes", JSON.stringify(data));
    }
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function showSavedData() {
  let data = JSON.parse(localStorage.getItem("notes"));
  if (data != null) {
    data.forEach(function (item) {
      //Todo DIV
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      //Create Li
      const newTodo = document.createElement("li");
      newTodo.innerText = item;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);

      //Check Mark Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = "<i class='fas fa-check'></i>";
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);

      //Check Trash Button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = "<i class='fas fa-trash'></i>";
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      //Append to list
      todoList.appendChild(todoDiv);
    });
  }
}

//localStorage.clear();
