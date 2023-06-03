// Récupère les données de l'API
function getWorks() {
  return fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      works = data;
      return data;
    });
}

function init() {
  getWorks()
    .then(works => {
      console.log(works);
      displayGallery(works);
      displayGalleryInModal(works);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des œuvres :', error);
    });
}
let works;
// Affiche les images de la galerie
function createImageElement(work, modal) {
  const imgURL = document.createElement("img");
  const title = document.createElement("figcaption");
  imgURL.src = work.imageUrl;
  imgURL.setAttribute("data-category", work.category.name);
  title.innerText = work.title;

  const figure = document.createElement("figure");
  figure.appendChild(imgURL);
  figure.appendChild(title);

  if(modal) {
    modal.appendChild(figure);
  }

  return figure;
}

function displayGallery(works) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = "";

  works.forEach(work => {
    const figure = createImageElement(work);
    gallery.appendChild(figure);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});

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
  changeLogoutButton();
  deleteFilters();
  btnModifier();
  btnModifier2(localStorage.getItem("token"));
  editionMode();
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

//Edition Mode
function editionMode(){ 
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

function btnModifier(token) {
  const figure = document.querySelector('figure');
  figure.id = 'figureContainer';
  
  const figureTexte = createModifierElement('figureTexte', 'Modifier');
  
  figure.appendChild(figureTexte);
}
function btnModifier2(token) {
  if (token) {
    const portfolio = document.querySelector('#portfolio');
    const projetDiv = document.createElement('div');
    projetDiv.classList.add('Projets');

    const modifierTexte = createModifierElement('modifier-texte', 'Modifier');
    const title = document.createElement('h2');
    title.textContent = 'Mes Projets';

    projetDiv.appendChild(title);
    projetDiv.appendChild(modifierTexte);

    portfolio.insertBefore(projetDiv, portfolio.querySelector('#gallery'));

    getWorks()
      .then(works => {
        createModal(1, works);
      });

    function modifierClickHandler() {
      console.log('Bouton Modifier cliqué !');

      const step = 1;
      if (step === 1) {
        getWorks()
          .then(works => {
            createModal(step, works); // Passez les œuvres en paramètre ici
          });
      }
      // Supprimer l'écouteur d'événement une fois que la modale a été créée
      modifierTexte.removeEventListener('click', modifierClickHandler);
    }

    modifierTexte.addEventListener('click', modifierClickHandler);
  }
}

//Modale
function displayGalleryInModal(works) {
  const modalGallery = document.querySelector('#modalStep1');
  if (!modalGallery) {
    console.error('L\'élément avec l\'ID "modalStep1" n\'existe pas.');
    return;
  }

  modalGallery.innerHTML = "";

  works.forEach(work => {
    const figure = createImageElement(work, modalGallery);
    modalGallery.appendChild(figure);
  });
}


function createModalOverlay() {
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');
  return modalOverlay;
}

function createModal(step, works) {
  const modalContainer = document.querySelector('#gallery');
  if (!modalContainer) {
    console.error('L\'élément avec l\'ID "gallery" n\'existe pas.');
    return;
  }

  const modalOverlay = createModalOverlay();
  const modalContent = createModalContent(step, modalOverlay, works);

  modalOverlay.appendChild(modalContent);
  modalContainer.appendChild(modalOverlay);

  modalContent.classList.add('show-gallery');
  displayGalleryInModal(works);
}


function createModalContent(step, modalOverlay, works) {
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  if (step === 1) {
    const modalTitle = ModalTitle();
    const modalCloseButton = ModalCloseButton(modalOverlay);
    const btnAjouterUnePhoto = ModalButton('Ajouter une photo', 'btn-ajouter', 'btnAjouterUnePhoto');
    const supprimerLaGallery = ModalParagraph('Supprimer la galerie', 'modal-btn-suprimer', 'modalBtnSuprimer');

    const modalStep1 = document.createElement("div");
    modalStep1.id ="modalStep1";

    modalContent.appendChild(modalTitle);
    modalContent.appendChild(btnAjouterUnePhoto);
    modalContent.appendChild(supprimerLaGallery);
    modalContent.appendChild(modalStep1);
    modalContent.appendChild(modalCloseButton);

    // Écouteur d'événement pour le bouton "Ajouter une photo"
    btnAjouterUnePhoto.addEventListener('click', () => {
      console.log('btn ajouter une photo cliqué');
    });
   
    // Affiche la galerie existante lorsque la modale est ouverte
    modalOverlay.addEventListener('click', () => {
      modalContent.classList.add('show-gallery');
      displayGalleryInModal(works);
    });

    // Cache la galerie lorsque la modale est fermée
    modalCloseButton.addEventListener('click', () => {
      modalContent.classList.remove('show-gallery');
    });
  }
  return modalContent;
}


function ModalTitle() {
  const modalTitle = document.createElement('h3');
  modalTitle.textContent = 'Galerie photo';
  modalTitle.classList.add('modal-title');
  return modalTitle;
}

function ModalCloseButton(modalOverlay) {
  const modalCloseButton = document.createElement('button');
  modalCloseButton.classList.add('modal-close');
  modalCloseButton.textContent = 'X';
  modalCloseButton.addEventListener('click', () => {
    modalOverlay.style.display = 'none'; // Fermer la modale en masquant l'overlay
  });
  return modalCloseButton;
}

function ModalButton(text, className, id) {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add(className);
  button.id = id;
  return button;
}

function ModalParagraph(text, className, id) {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  paragraph.classList.add(className);
  paragraph.id = id;
  return paragraph;
}


//Modal Ajout Photo
const btnAjouterUnePhoto = document.getElementById('btnAjouterUnePhoto');

//function openModalAjoutPhoto() {
 // modalForm();
  //arrowReturn();
  //deleteModalGaleriePhoto();
//}

//btnAjouterUnePhoto.addEventListener('click', () => {
 // openModalAjoutPhoto();
  //console.log('btn ajouter une photo cliqué');
//});

//openModalAjoutPhoto();
//console.log(btnAjouterUnePhoto);

//function modalForm() {
  //modalInputTitre();
  //modalInputCategorie();
  //btnValiderForm();
//}
//function modalInputTitre() {

//}
//function modalInputCategorie() {

//}

//function btnValiderForm() {

//}

//function arrowReturn() {

//}

//function deleteModalGaleriePhoto() {
  //document.getElementById('modalBtnSuprimer').remove();
  //document.getElementById('btnAjouterUnePhoto').remove();
//}
