const actionBtn = document.querySelector(".start");
//let counter = document.querySelector("#time-left");
let min = document.querySelector("#minutes");
let sec = document.querySelector("#seconds");

let workTime = 25;
let shortBreak = 5;
let longBreak = 15;
let seconds = "00";

function pomoPause(){
    actionBtn.innerText = "PAUSE";
    actionBtn.classList.remove('active');
    actionBtn.setAttribute("onclick", "pomoStart()");
}

function pomoStart(){
    actionBtn.innerText = "START";
    actionBtn.classList.add('active');
    actionBtn.setAttribute("onclick", "pomoPause()");


    seconds = 59;

    let workMinutes = workTime - 1;
    let shortBreakMinutes = shortBreak - 1;
    let longBreakMinutes = longBreak - 1;

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

        if(seconds == 0){
            workMinutes--;
            if(workMinutes == -1){
                min.innerText = '0' + 0;
                sec.innerText = '0' + 0;
                clearTimeout(intervalo);
            }
            seconds = 59;
        }
    }
    let intervalo = setInterval(timerFunction, 1000);
}