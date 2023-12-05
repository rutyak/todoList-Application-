console.log("Script Loaded");
var i = 0;
let date = new Date();
console.log('date : ',date);
let dayOfMonth = ('0' + date.getDate()).slice(-2);
let currYear = date.getFullYear();
let currMonth = date.getMonth();

function taskLoaded(e) {
    try {
        e.preventDefault();
        let task = document.getElementById('task1').value;
        let desc = document.getElementById('desc1').value;
        let priority = document.getElementById('priority').value;
         
        console.log("task : ", task);
        console.log("desc : ", desc);

        let data = JSON.parse(localStorage.getItem('data'))||[];  //retriving old data

        let taskData = {
            'id': data.length,
            'task': task,
            'desc' : desc,
            'priority': priority,
            'date': `${dayOfMonth}`
        }
        
        data.push(taskData);

        localStorage.setItem('data',JSON.stringify(data));

        console.log("NewAdded", taskData);

    } catch (error) {
        console.log(error);
    }
}

function clearLocalStorage(e){
    try {
        e.preventDefault();
        localStorage.clear();
        console.log("Storage cleared")
    } catch (error) {
        console.log(error);
    }
}

let btn = document.getElementById('btn-submit-task');
let clear = document.getElementById('btn-clear-task');


btn.addEventListener('click', (e) => {
    taskLoaded(e);
});

clear.addEventListener('click', (e) => {
    clearLocalStorage(e);
});