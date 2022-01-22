const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const todoInput = document.querySelector("#todo-form input");

const TODOS_KEY="todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
  console.log(li.id);
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
  }

function writeToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.style.background="none";
    button.style.padding="0";
    button.style.border="none";
    button.innerText = " 👌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
  }

function toDoSubmit(event){
 event.preventDefault();
 const newTodo = todoInput.value;
 todoInput.value= "";
  const newTodoObj = {
     text: newTodo,
     id: Date.now(),
   };
 toDos.push(newTodoObj);
 writeToDo(newTodoObj);
 saveToDos();
}

todoForm.addEventListener("submit", toDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(writeToDo);
}