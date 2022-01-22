# MOMENTUM
##  HTML,CSS,JavaScript 사용
### CSS
```css
//배경과 폰트
 body{
     background: linear-gradient(to right, #ff9966, #ff5e62);
     font-family: 'Playfair Display', serif;
 }
 .hidden{
     display: none;
 }
 ```

### HTML
```html
//사용폰트 링크
    <head>    
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap" rel="stylesheet">
    </head>
 ```
 ```html
   //전체 가운데 정렬
        <body style="position:relative; left:50vw; top:50vh; transform: translate(-50%, -50%); text-align:center;" >  
            <h2 style = "color: white;" id = "clock">00 : 00 : 00</h2>    //시계 출력
          <form id="form" class = "hidden" >       //login 최대 15문자 입력 가능
           <input 
            required
            maxlength="15"
            type="text"
            placeholder="What is you name?"/>
            <input type="submit" value="Log In"/>
          </form>
          <h1 id = "greeting" class = "hidden"></h1>  //log in 성공 시 출력
          <form id="todo-form">
              <input type = "text" placeholder="Write a To do!" required/>  //todolist 입력 가능
          </form>
          <ul id="todo-list"></ul>  
```
### JAVASCRIPT
 #### login.js
 ```javascript
 const loginInput = document.querySelector("#form input");
const loginForm = document.querySelector("#form");
const greeting = document.querySelector("#greeting");
const USERNAMEKEY = "username";
const HIDDEN_CLASS = "hidden";

function logInSubmit(event){  //로그인 성공시 값 저장 및 함수 불러오기
   event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASS);
    const username = loginInput.value;
    localStorage.setItem(USERNAMEKEY,username);
    writegreeting(username);
    }


    function writegreeting(username){  //login 성공시 출력
        greeting.innerText=`Hello ${username}`;
        greeting.classList.remove(HIDDEN_CLASS);
    }

const saveUser = localStorage.getItem(USERNAMEKEY); //값 불러오기

if(saveUser === null){ //값이 없으면 로그인 화면을 출력
    loginForm.classList.remove(HIDDEN_CLASS);
    loginForm.addEventListener("submit",logInSubmit);
} else{
    writegreeting(saveUser);
}
 ```
 #### todo.js
 ```javascript
 let toDos = [];

function saveToDos() {  //입력받은 todo 저장
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) { //todo 삭제 시, 스토리지에서도 삭제
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
    const button = document.createElement("button"); //완료 후 지울 버튼 정의
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
```
#### clock.js
```javascript
const clock = document.querySelector("#clock");
function timer(){ //시,분,초 2자릿수로 맞춤
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText= `${hours} : ${minutes} : ${seconds}`;
}
timer();
setInterval(timer,1000); //1초마다 갱신
```
