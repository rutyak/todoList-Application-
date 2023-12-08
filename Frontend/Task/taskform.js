
let date = new Date();
//time
let hours = date.getHours();
let ampm = hours < 12 ? 'am':'pm';
hours = hours % 12;
hours = hours ? hours : 12; //hours 0 should be 12
let minutes = date.getMinutes();
minutes = minutes < 10 ? '0'+minutes: minutes;
let time = hours +':'+ minutes + ampm;
console.log("time :", time);
//Date
let dayOfMonth = ('0' + date.getDate()).slice(-2);
// let currYear = date.getFullYear();
// let currMonth = date.getMonth();


let btn = document.querySelector('.btn-submit-task');
btn.addEventListener('click', (e) => {
    taskform(e);
});


async function taskform(e) {
    try {
        e.preventDefault();
        console.log("Script Loaded");
        const warn = document.getElementById("warning");
        let task = document.getElementById('task1').value;
        let desc = document.getElementById('desc1').value;
        let priority = document.getElementById('priority').value;
      
        // Check if the task, priority and desc are not empty
        if (task === "" || desc === "" || priority === "") {
          warn.innerHTML = `<div style="color: red"><p>Please fill in all fields</p></div>`;
          return;
        }
      
        const response = await fetch("http://localhost:5000/taskform", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task, desc, time, dayOfMonth, priority }),
        });
      
        const data = await response.json();
      
        if (response.ok) {
          warn.innerHTML = `<div style="color: green; background-color: aqua;"><p>${data.message}</p></div>`;
          // Redirect after successful login
          setTimeout(() => {
            location.href = "/Frontend/Home.html";
          }, 2000);
        } else {
          warn.innerHTML = `<div style="color: red"><p>Invalid data</p></div>`;
        }
    } catch (error) {
        console.log("Error",error);
    }
  }
