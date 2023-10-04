//selectors
const todoInput = document.querySelector(".todo-input");
const submitBtn = document.querySelector(".submit-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
submitBtn.addEventListener("click", addListItem);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions

function addListItem(event) {
  event.preventDefault();

  const newDiv = document.createElement("div");
  newDiv.classList.add("todo");
  todoList.appendChild(newDiv);

  const newItem = document.createElement("li");
  newItem.classList.add("item");
  newItem.innerHTML = todoInput.value;
  newDiv.appendChild(newItem);

  saveTodos(todoInput.value);

  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.classList.add("completed-btn");
  newDiv.appendChild(completedBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add("delete-btn");

  newDiv.appendChild(deleteBtn);

  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "delete-btn") {
    item.parentElement.classList.add("fall");
    deleteLocalTodos(item.parentElement);
    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();
    });
  }

  if (item.classList[0] === "completed-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

/*function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "All":
        todo.style.display = "flex";
        break;
      case "Completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "Incompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}*/

function filterTodo(e) {
  const todos = todoList.childNodes;

  for (let todo of todos) {
    if (e.target.value === "All") {
      todo.style.display = "flex";
    } else if (e.target.value === "Completed") {
      if (todo.classList.contains("completed")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    } else if (e.target.value === "Incompleted") {
      if (todo.classList.contains("completed")) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    }
  }
}

function saveTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];

    const newDiv = document.createElement("div");
    newDiv.classList.add("todo");
    todoList.appendChild(newDiv);

    const newItem = document.createElement("li");
    newItem.classList.add("item");
    newItem.innerHTML = todo;
    newDiv.appendChild(newItem);

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("completed-btn");
    newDiv.appendChild(completedBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");

    newDiv.appendChild(deleteBtn);
  }
}

function deleteLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const itemIndex = todo.children[0].innerHTML;
  todos.splice(todos.indexOf(itemIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
