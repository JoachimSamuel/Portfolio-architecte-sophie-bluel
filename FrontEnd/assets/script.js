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

  // Mode edition
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

    // Suprimer les filtres
    document.getElementById('filters').remove();
    document.getElementById('projets').remove();

    
    // BTN modifier
    const figure = document.querySelector('figure');

    // Créer un nouvel élément à ajouter à la <figure>
    const image = document.createElement('p');
    image.textContent = "Modifier";
    image.className  = "figure-modifier";
    
    // Ajouter l'image à la <figure>
    figure.appendChild(image);
    
    // Sélectionner la balise <section id="portfolio">
    const portfolio = document.querySelector('#portfolio');
    
    const projetDiv = document.createElement('div');
    projetDiv.className = "Projets";
    
    // Créer un nouvel élément à ajouter à la <div> Projets
    const description = document.createElement('p');
    description.id = "modifier-Projet"
    const title = document.createElement('h2')
    description.textContent = 'Modifier';
    title.textContent = "Mes Projets";
    
    projetDiv.appendChild(title)
    projetDiv.appendChild(description)
    portfolio.insertBefore(projetDiv, portfolio.querySelector('#gallery'));

    //Modal

      // Récupérer la div qui contiendra la modale
const modalContainer = document.querySelector('#gallery');

// Créer les éléments HTML pour la modale
const modalOverlay = document.createElement('div');
modalOverlay.classList.add('modal-overlay');

const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

const modalCloseButton = document.createElement('button');
modalCloseButton.classList.add('modal-close');
modalCloseButton.textContent = 'X';

const modalTitle = document.createElement('h3');
modalTitle.textContent = 'Gallerie photo';

const modalText = document.createElement('p');
modalText.textContent = 'Contenu de la modale';

// Ajouter les éléments à la modale
modalContent.appendChild(modalCloseButton);
modalContent.appendChild(modalTitle);
modalContent.appendChild(modalText);
modalOverlay.appendChild(modalContent);

// Ajouter la modale à la page
modalContainer.appendChild(modalOverlay);

// Ajouter un événement au bouton de fermeture
modalCloseButton.addEventListener('click', function() {
  modalOverlay.style.display = 'none';
});

// Ajouter un événement au bouton qui ouvre la modale
const modalOpenButton = document.querySelector('#modifier-Projet');
modalOpenButton.addEventListener('click', function() {
  modalOverlay.style.display = 'block';
});





    //const modal = document.getElementById('gallery');
    //const btnModifier = document.getElementById('modifier-Projet');
      
   // btnModifier.addEventListener("click", openModal);
    
    //function openModal() {
    //  const divModal = document.getElementById("gallery");
    //  console.log(divModal);

    //  const modalImg = document.createElement('p');
    //  modalImg.innerHTML = "test";
    //  modal.appendChild(modalImg);
   // }
     
    


    

}
