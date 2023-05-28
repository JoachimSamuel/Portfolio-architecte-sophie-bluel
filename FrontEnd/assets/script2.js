// Récupere les donné de l'api 
function getWorks() {
    return fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(data => data);
}
function init() {
    getWorks()
      .then(works => {
        displayGallery(works);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des œuvres :', error);
      });
}
// Aficher les images 
function displayGallery(works) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = "";
  
    works.forEach(work => {
      const imgURL = document.createElement("img");
      const title = document.createElement("figcaption");
      imgURL.src = work.imageUrl;
      imgURL.setAttribute("data-category", work.category.name);
      title.innerText = work.title;
      
      const figure = document.createElement("figure");
      figure.appendChild(imgURL);
      figure.appendChild(title);
     
      gallery.appendChild(figure);
    });
}
document.addEventListener('DOMContentLoaded', function() {
  init();
});

//********** Voir avec mentor pourquoi sa ne marche pas filtrage par categoryID *************/
// Écouteur d'événement pour les boutons de filtre
//const buttons = document.querySelectorAll("#filters button");
//buttons.forEach(button => {
  //button.addEventListener("click", (event) => {
//    const categoryId = event.target.getAttribute("data-category-id");
//    filterGalleryByCategory(categoryId);
//  });
//});
// Fonction pour filtrer la galerie par catégorie
//function filterGalleryByCategory(categoryId) {
//  getWorks()
//    .then(works => {
//      const filteredWorks = works.filter(work => work.categoryId === categoryId);
//      displayGallery(filteredWorks);
//    })
//    .catch(error => {
//      console.error('Une erreur s\'est produite lors de la récupération des œuvres :', error);
//    });
//}
//******************************************************************************************************/

// Écouteur d'événement pour les boutons de filtre
const buttons = document.querySelectorAll("#filters button");
buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    const categoryName = event.target.getAttribute("data-category-name");
    filterGalleryByCategory(categoryName);
  });
});

// Fonction pour filtrer la galerie par catégorie
function filterGalleryByCategory(categoryName) {
  getWorks()
    .then(works => {
      let filteredWorks;
      
      if (categoryName === "Tous") {
        filteredWorks = works; // Afficher toutes les œuvres
      } else {
        filteredWorks = works.filter(work => work.category.name === categoryName);
      }
      
      displayGallery(filteredWorks);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des œuvres :', error);
    });
}

// Mettre à jour la page d'accueil si le token est présent
if(localStorage.getItem("token")) {
    changeLogoutButton()
    deleteFilters()
    btnModifier()
    btnModifier2()
}

//Changer BTN de d'éconexion
function changeLogoutButton() {
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
  }

// Suprimer les filtres
function deleteFilters(){
    document.getElementById('filters').remove();
    document.getElementById('projets').remove();
}
//BTN Modifier 
function createModifierElement(className, textContent) {
  const element = document.createElement('div');
  element.className = className;
  
  const modifierLogo = document.createElement('i');
  modifierLogo.className = 'fa-solid fa-pen-to-square';
  
  const modifier = document.createElement('p');
  modifier.textContent = textContent;
  modifier.className = 'figure-modifier';
  
  element.appendChild(modifier);
  element.appendChild(modifierLogo);
  
  return element;
}

function btnModifier() {
  const figure = document.querySelector('figure');
  figure.id = 'figureContainer';
  
  const figureTexte = createModifierElement('figureTexte', 'Modifier');
  
  figure.appendChild(figureTexte);
}

function btnModifier2() {
  const portfolio = document.querySelector('#portfolio');
  const projetDiv = document.createElement('div');
  projetDiv.classList.add('Projets');
  
  const modifierTetxe = createModifierElement('modifier-texte', 'Modifier');
  
  const title = document.createElement('h2');
  title.textContent = 'Mes Projets';
  
  projetDiv.appendChild(title);
  projetDiv.appendChild(modifierTetxe);
  
  portfolio.insertBefore(projetDiv, portfolio.querySelector('#gallery'));
}
