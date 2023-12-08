async function signup() {
  let warn = document.getElementById("warning");
  let emailInput = document.getElementById("email");
  let name = document.getElementById("name");
  let cpassword = document.getElementById("cpassword");
  let passwordInput = document.getElementById("password");
  let email = emailInput.value.trim(); 
  let password = passwordInput.value.trim();
  cpassword = cpassword.value.trim();
  name = name.value.trim();

  // Check if the email and password are not empty
  if (email === "" || password === "" || name === "" || cpassword === "") {
    warn.innerHTML = `<div style="color: red"><p>Please fill in all fields</p></div>`;
    return;
  }
  if(password !== cpassword ){
    warn.innerHTML = `<div style="color: red"><p>Passwords must be same.</p></div>`;
    return;
  }
  if(password.length < 6){
    warn.innerHTML = `<div style="color: red"><p>Password must contain char greater than 6</p></div>`;
    return;
  }

  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json(); 

  if (response.ok) {
    warn.innerHTML = `<div style="color: green"><p>${data.message}</p></div>`;
    // Redirect after successful signup
    setTimeout(() => {
      location.href = "/Frontend/Home.html";
    }, 2000);
  } else {
    warn.innerHTML = `<div style="color: red"><p>${data.message}</p></div>`;
  }
}

async function login() {
  const warn = document.getElementById("warning");
  const emailInput = document.getElementById("email1");
  const passwordInput = document.getElementById("password1");
  const email = emailInput.value.trim();  //removing space
  const password = passwordInput.value.trim();

  // Check if the email and password are not empty
  if (email === "" || password === "") {
    warn.innerHTML = `<div style="color: red"><p>Please fill in all fields</p></div>`;
    return;
  }

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    warn.innerHTML = `<div style="color: green"><p>${data.message}</p></div>`;
    // Redirect after successful login
    setTimeout(() => {
      location.href = "/Frontend/Home.html";
    }, 2000);
  } else {
    warn.innerHTML = `<div style="color: red"><p>${data.message}</p></div>`;
  }
}
