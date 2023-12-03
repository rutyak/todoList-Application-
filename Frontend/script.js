// ---------------------------calender-functionality--------------------------------------------

const currentDate = document.querySelector(".current-date");
const previousNext = document.querySelectorAll(".icons img");
const days = document.querySelector(".days");

let date = new Date();
let dayOfMonth = ('0' + date.getDate()).slice(-2);
let currYear = date.getFullYear();
let currMonth = date.getMonth();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let renderCalendar = () => {
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // last date of month
  let firstDay = new Date(currYear, currMonth, 1).getDay(); // first day of month
  console.log(firstDay);
  let lastDay = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // last day of month
  const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); // last date of last month

  let liTag = "";

  for (let i = firstDay; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    // if date is actual date then highlight it
    let isToday =
      i === date.getDate() &&
      currMonth === date.getMonth() &&
      currYear === date.getFullYear()
        ? "active"
        : "";
    liTag += `<li class='${isToday}'>${i}</li>`;
  }

  for (let i = lastDay; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDay + 1}</li>`;
  }
  currentDate.innerHTML = `${months[currMonth % 12]} ${currYear}`;
  days.innerHTML = liTag;
};

renderCalendar();

previousNext.forEach((icon) => {
  icon.addEventListener("click", () => {
    // when click then showing element
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    renderCalendar();
  });
});

// ------------------------------------------todo-functionality-------------------------------

let taskModule = document.querySelector(".task-main-module");

function renderTask(){
let taskInfo = JSON.parse(localStorage.getItem("data"));
console.log(taskInfo);
let entireInfo  = [];
taskInfo.forEach((value, i)=>{
  entireInfo.push(`
  <div class="task-module">
  <div>
    <p class='para'>${taskInfo[i].task}</p>
  </div>
  <div class="middel-of-task">
  <div>
      <p class='para'>${taskInfo[i].desc}</p>
  </div>
  <div class="btn-of-task">
      <input type="checkbox" id="complete" name="complete" value="Completed">
      <img onclick="deleteTask(${i})" src="./Asset/bin_484611.png" alt="img">
  </div>
  </div>
  <div class="date-of-task">
  <p>${dayOfMonth}/${currMonth}/${currYear}</p>
  </div>
  </div>
  `);
  
  taskModule.innerHTML = entireInfo.join('');
})
}
renderTask(); 
// -----------------delete-functionality------------------



let localData = JSON.parse(localStorage.getItem('data'));

function deleteTask(i){
  localData.splice(i,1); // removiing one item
  localStorage.setItem('data',JSON.stringify(localData));
  renderTask(); 
}


// ----------------------------completed-tasks------------------------------------------

function completedTask(){
  console.log('Completed task clicked');
}