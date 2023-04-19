let loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
  };

  let bodyContent = JSON.stringify({
    "email": loginForm.email.value,
    "password": loginForm.password.value
  });

  let response = await fetch("http://localhost:5678/api/users/login", { 
    method: "POST",
    body: bodyContent,
    headers: headersList
  });

  let data = await response.text();
  console.log(data);
});
