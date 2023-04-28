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

  if (!response.ok) {
    // Afficher un message d'erreur si la requête échoue
    let errorData = await response.json();
    const error= document.createElement("p");
    error.textContent = "Mot de passe/ e-mail incorect"
    document.body.appendChild(error);
    alert("Mot de passe/ e-mail incorect");
  } else {
    // Stocker le token dans localStorage
    let data = await response.json();
    localStorage.setItem("token", data.token);

    // Rediriger vers la page d'accueil si l'authentification réussit
    window.location.href = "./index.html";
        }
  });
