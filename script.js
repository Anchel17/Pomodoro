const actionBtn = document.querySelector(".start");
const pomodoroBtn = document.querySelector("#pomo");
const shortBtn = document.querySelector("#short-break");
const longBtn = document.querySelector("#long-break");
const body = document.querySelector("body");
const header = document.querySelector(".header")
const timer = document.querySelector(".timer");

const addTaskBtn = document.querySelector("#add-task");
const taskCreate = document.querySelector(".create-task");
const taskList = document.querySelector(".tasks");
const saveTaskBtn = document.querySelector("#save");
const cancelTaskCreationBtn = document.querySelector("#cancel");
const taskTitle = document.querySelector("#task-title");
const taskDescription = document.querySelector("#task-description");

const headerIcons = document.querySelectorAll(".header-icons");

//let counter = document.querySelector("#time-left");
let min = document.querySelector("#minutes");
let sec = document.querySelector("#seconds");
let intervalo;

let workTime = 25;
let shortBreak = 5;
let longBreak = 15;
//let seconds = "00";
let seconds = 59;

let workMinutes = workTime - 1;
let shortBreakMinutes = shortBreak;
let longBreakMinutes = longBreak;

let tasks;
let id;

const getTasks = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setTasks = () => localStorage.setItem('dbfunc', JSON.stringify(tasks));

function loadTasks(){
    tasks = getTasks();
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) =>{
        insertTask(task, index);
    });
}

loadTasks();

function insertTask(task, index){
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("created-task");
    
    taskDiv.innerHTML = `
        <div class="created-task-title-container">
        <div class="flex-title">
            <button class="check-task">
                <img src="./icons/bx-check-circle.svg" alt="Check Task">
            </button>

            <span class="task-created-title">${task.title}</span>
        </div>
        <button class="edit-task" onclick="editTask(${index})">
            <img src="./icons/bx-edit.svg" alt="Edit task">
        </button>
        <button class="exclude-task" onclick="excludeTask(${index})">
            <img src="./icons/bx-trash.svg" alt="Exclude task">
        </button>
        </div>
    `

    if(task.description != ''){
        taskDiv.innerHTML += `
        <div class="created-task-description-container">
            <span id="created-task-description">${task.description}</span>
        </div>
        `
    }

    taskList.appendChild(taskDiv);
}

function excludeTask(index){
    tasks.splice(index, 1);

    setTasks();
    loadTasks();
}

function editTask(index){
    openForm();

    taskTitle.value = tasks[index].title;
    taskDescription.value = tasks[index].description;
    id = index;
}

function pomoPause(){
    actionBtn.innerText = "START";
    actionBtn.classList.remove('active');
    actionBtn.setAttribute("onclick", "pomoStart()");
    clearTimeout(intervalo);
}

function pomoStart(){
    actionBtn.innerText = "PAUSE";
    actionBtn.classList.add('active');
    actionBtn.setAttribute("onclick", "pomoPause()");

    //seconds = 59;

    //workMinutes--;
    //workMinutes = workTime - 1;
    //shortBreakMinutes = shortBreak - 1;
    //longBreakMinutes = longBreak - 1;

    //decrementar tempo
    let timerFunction = () =>{
        if(workMinutes < 10){
            min.innerText = '0' + workMinutes;
        }
        else{
            min.innerText = workMinutes;
        }

        if(seconds < 10){
            sec.innerText = '0' + seconds;
        }
        else{
            sec.innerText = seconds;
        }

        seconds--;

        if(seconds == -1){
            workMinutes--;
            if(workMinutes == -1){
                min.innerText = '0' + 0;
                sec.innerText = '0' + 0;
                clearTimeout(intervalo);
            }
            seconds = 59;
        }
    }

    intervalo = setInterval(timerFunction, 1000);
}

function method(option){
    pomoPause();
    if(option.innerText === "Pomodoro"){
        workMinutes = workTime;
        seconds = 0;
        min.innerText = + workMinutes;
        sec.innerText = "0" + seconds;
        workMinutes--;
        seconds = 59;

        pomodoroBtn.classList.add("option-active");
        shortBtn.classList.remove("option-active");
        longBtn.classList.remove("option-active");

        pomodoroBtn.style.setProperty("background-color", "#A44E4E", "important");
        shortBtn.style.backgroundColor = "#C15C5C";
        longBtn.style.backgroundColor = "#C15C5C";

        header.style.borderColor = "#A74242";
        header.style.transition = ".4s";
        headerIcons.forEach((el) => {
            el.style.backgroundColor = "#C15C5C";
            el.style.transition = "0.4s";
        })
        timer.style.backgroundColor = "#C15C5C";
        timer.style.transition = "0.4s";
        actionBtn.style.color = "#C15C5C";
        actionBtn.style.transition = "0.4s";

        body.style.backgroundColor = "#BA4949";
        body.style.transition = "0.4s";
    }
    else if(option.innerText === "Short Break"){
        workMinutes = shortBreak;
        seconds = 0;
        min.innerText = "0" + workMinutes;
        sec.innerText = "0" + seconds;
        workMinutes--;
        seconds = 59;

        pomodoroBtn.classList.remove("option-active");
        shortBtn.classList.add("option-active");
        longBtn.classList.remove("option-active");

        pomodoroBtn.style.backgroundColor = "#4C9196";
        shortBtn.style.setProperty("background-color", "#417B80", "important");
        longBtn.style.backgroundColor = "#4C9196";

        header.style.borderColor = "#32777C";
        header.style.transition = ".4s";
        headerIcons.forEach((el) => {
            el.style.backgroundColor = "#4C9196";
            el.style.transition = "0.4s";
        })
        timer.style.backgroundColor = "#4C9196";
        timer.style.transition = "0.4s";
        actionBtn.style.color = "#4C9196";
        actionBtn.style.transition = "0.4s";
        body.style.backgroundColor = "#38858A";
        body.style.transition = "0.4s";
    }
    else if(option.innerText === "Long Break"){
        workMinutes = longBreak;
        seconds = 0;
        min.innerText = + workMinutes;
        sec.innerText = "0" + seconds;
        workMinutes--;
        seconds = 59;

        pomodoroBtn.classList.remove("option-active");
        shortBtn.classList.remove("option-active");
        longBtn.classList.add("option-active");

        pomodoroBtn.style.backgroundColor = "#4D7FA2";
        shortBtn.style.backgroundColor = "#4D7FA2";
        longBtn.style.setProperty("background-color", "#426C8A", "important");

        header.style.borderColor = "#336588";
        header.style.transition = ".4s";
        headerIcons.forEach((el) => {
            el.style.backgroundColor = "#4D7FA2";
            el.style.transition = "0.4s";
        })
        timer.style.backgroundColor = "#4D7FA2";
        timer.style.transition = "0.4s";
        actionBtn.style.color = "#4D7FA2";
        actionBtn.style.transition = "0.4s";
        body.style.backgroundColor = "#397097";
        body.style.transition = "0.5s";
    }
}

function openForm(){
    taskCreate.style.setProperty("display", "flex");
    addTaskBtn.style.setProperty("display", "none");
    taskTitle.value = '';
    taskDescription.value = '';
}

cancelTaskCreationBtn.onclick = e =>{
    taskCreate.style.setProperty("display", "none");
    addTaskBtn.style.setProperty("display", "flex");
}

saveTaskBtn.onclick = e => {
    taskTitle.value = taskTitle.value.trim();
    taskDescription.value = taskDescription.value.trim();

    if(taskTitle.value == ''){
        return;
    }

    e.preventDefault();

    if(id != undefined){
        tasks[id].title = taskTitle.value;
        tasks[id].description = taskDescription.value;
    }
    else{
        tasks.push({'title': taskTitle.value, 'description': taskDescription.value});
    }

    setTasks();

    taskCreate.style.setProperty("display", "none");
    addTaskBtn.style.setProperty("display", "flex");

    loadTasks();
    id = undefined;
}