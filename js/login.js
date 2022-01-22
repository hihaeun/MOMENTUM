const loginInput = document.querySelector("#form input");
const loginForm = document.querySelector("#form");
const greeting = document.querySelector("#greeting");
const USERNAMEKEY = "username";
const HIDDEN_CLASS = "hidden";

function logInSubmit(event){
   event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASS);
    const username = loginInput.value;
    localStorage.setItem(USERNAMEKEY,username);
    writegreeting(username);
    }


    function writegreeting(username){
        greeting.innerText=`Hello ${username}`;
        greeting.classList.remove(HIDDEN_CLASS);
    }

const saveUser = localStorage.getItem(USERNAMEKEY);

if(saveUser === null){
    loginForm.classList.remove(HIDDEN_CLASS);
    loginForm.addEventListener("submit",logInSubmit);
} else{
    writegreeting(saveUser);
}