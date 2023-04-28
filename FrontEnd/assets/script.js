// Afficher les images 
fetch('http://localhost:5678/api/works')
  .then(r => r.json())
  .then(data => {
    const gallery = document.querySelector('.gallery');
    data.forEach(work => {
      const imgURL = document.createElement("img");
      const title = document.createElement("figcaption");
      imgURL.src = work.imageUrl;
      imgURL.setAttribute("data-category", work.category.name); // Utiliser le nom de la catégorie
      title.innerText = work.title;
      const figure = document.createElement("figure");
      figure.appendChild(imgURL);
      figure.appendChild(title);
      gallery.appendChild(figure);
    });

    // Filtres 
let filters = document.querySelectorAll("#filters button");

//Ecouter le bouton cliqué
for(let filter of filters){
  filter.addEventListener("click", function(){
    let tag = this.id;
    let images = document.querySelectorAll('.gallery img');
    for(let image of images) {
      if(tag === 'Tous' || image.getAttribute('data-category') === tag) {
        image.parentElement.style.display = "block"; // Afficher l'élément parent
      } 
      else { 
        image.parentElement.style.display = "none"; // Cacher l'élément parent
      }
    }
    
    // Ajouter ou supprimer la classe "active"
    for(let i=0; i<filters.length; i++) {
      if(filters[i].classList.contains("active")) {
        filters[i].classList.remove("active");
      }
    }
    this.classList.add("active");
  });
}

      });

  // Mettre à jour la page d'accueil si le token est présent
if(localStorage.getItem("token")) {
  // Mettre à jour le contenu de la page d'accueil
  const welcomeMessage = document.createElement("p");
  welcomeMessage.textContent = "Bienvenue sur notre site !";
  document.body.appendChild(welcomeMessage);
  //Mode edition
    const editionMode = document.createElement("div");
    const newParagraph = document.createElement("p");
    const newButton = document.createElement("button");
    const buttonText = document.createTextNode("publier les changements");
    const paragraphText =  document.createTextNode("Mode édition");
    
    newButton.appendChild(buttonText);
    newParagraph.appendChild(paragraphText);


    editionMode.appendChild(newParagraph);
    editionMode.appendChild(newButton);

    editionMode.classList.add("editionMode");
  
  
    let currentDiv = document.getElementById("header");
    document.body.insertBefore(editionMode, currentDiv);

  


  
  //BTN modifier
  const section = document.querySelector('figure');
  const modifierImages = document.createElement('div');
  modifierImages.textContent = "Modifier";
  modifierImages.className = "modifier"
  section.appendChild(modifierImages);

  const projet = document.querySelector('#portfolio');
  const modifierProjet = document.createElement('div');
  modifierProjet.textContent = "Modifier";
  modifierProjet.className = "modifier"
  projet.appendChild(modifierProjet);
  
  //Changer BTN de d'éconexion
  const parent = document.querySelector('ul');
  const log = parent.querySelector("#login");
  const logout = document.createElement('li');
  logout.id = 'logout';
  logout.innerHTML = "Logout";
  parent.replaceChild(logout, log);
  logout.addEventListener("click", () => {
    // Supprimer le token du stockage local et rediriger vers la page de connexion
    localStorage.removeItem("token");
    window.location.href = "./login.html";
  });
  //Suprimer les filtres
  document.getElementById('filters').remove();

}
