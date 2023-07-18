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
     
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des œuvres :', error);
    });
}
let works;
// Affiche les images de la galerie
function createImageElement(work) {
  const figure = document.createElement("figure");

  const imgContainer = document.createElement("div");
  

  const imgURL = document.createElement("img");
  imgURL.src = work.imageUrl;
  imgURL.setAttribute("data-category", work.category.name);
  imgContainer.appendChild(imgURL);

  const title = document.createElement("figcaption");
  title.innerText = work.title;
  figure.appendChild(imgContainer);
  figure.appendChild(title);

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
  const logoutLink = document.createElement('li');
  logoutLink.id = 'logout';
  logoutLink.innerHTML = "Logout";
  parent.replaceChild(logoutLink, log);
  logoutLink.addEventListener("click", logout)
}

function logout (){
    localStorage.removeItem("token");
    window.location.href = "./login.html";
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

    modifierTexte.addEventListener('click', function(){
      openModal();
      displayWorksManagerInModal(works);
      console.log("bnt modifié cliqué !")
    })    

    portfolio.insertBefore(projetDiv, portfolio.querySelector('#gallery'));
} 
}




//************** Modal *********************/

function openModal() {
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  displayInModal(modalContent);

  const modalOverlay = document.querySelector('.modal-overlay');
  modalOverlay.addEventListener('click', closeModalOutside);
}

// Crée l'élément du fond de la modale
function createModalOverlay() {
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');
  return modalOverlay;
}

// Crée l'élément du contenu de la modale
function createModalContent() {
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  return modalContent;
}

// Affiche un contenu dans la modale de la page
function displayInModal(content) {
  const modalOverlay = document.querySelector('.modal-overlay');

  // Vérifie si la modale existe déjà
  if (!modalOverlay) {
    const newModalOverlay = createModalOverlay();
    const newModalContent = createModalContent();

    newModalContent.appendChild(content);
    newModalOverlay.appendChild(newModalContent);
    document.body.appendChild(newModalOverlay);
  } else {
    const modalContent = modalOverlay.querySelector('.modal-content');
    modalContent.innerHTML = '';
    modalContent.appendChild(content);
  }
}

// Ferme la modale en dehors du contenu
function closeModalOutside(event) {
  const modalContent = event.target.closest('.modal-content');
  if (!modalContent) {
    closeModal();
  }
}

// Affiche le gestionnaire de galerie dans la modale
async function displayWorksManagerInModal(works) {
  const worksManager = document.createElement('div');

  const title = document.createElement('h3');
  title.textContent = "Galerie Photo";

  const closeButton = document.createElement('span');
  closeButton.textContent = "X";
  closeButton.classList.add ('modal-close-btn')
  closeButton.addEventListener('click', closeModal);
  
  const btnDeletAndAdd = document.createElement('div');
  btnDeletAndAdd.classList.add ('delet-ADD');

  const addWorkBtn = document.createElement('button');
  addWorkBtn.textContent = "Ajouter une photo";
  addWorkBtn.classList.add  ("modal-btn-ajouter");
  // Ajout de l'écouteur d'événement de clic au bouton "Ajouter une photo"
  addWorkBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    displayFormInModal();
  });

  const deleteGallery = document.createElement('button');
  deleteGallery.classList.add  ("modal-btn-delete")
  deleteGallery.textContent = "Supprimer la galerie";

  btnDeletAndAdd.appendChild(addWorkBtn);
  btnDeletAndAdd.appendChild(deleteGallery);    

  const gallery = await createGalleryInModal(); 

  worksManager.appendChild(closeButton);
  worksManager.appendChild(title);
  worksManager.appendChild(gallery);
  worksManager.appendChild(btnDeletAndAdd);

  displayInModal(worksManager);
}


/**
 * Crée une card pour un Work destiné à être affiché
 * @param {Object} Représente un Work récupéré de l'API
 * @returns {HTMLElement} Une carte représentant le Work
 */
function createWorkCard(work) {
  const workCard = document.createElement('div');
  workCard.classList.add('work-card');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  const img = document.createElement('img');
  img.setAttribute('src', work.imageUrl);

  const editButton = document.createElement('button');
  editButton.textContent = 'Éditer';

  const trashButton = document.createElement('i');
  trashButton.classList = 'trash fa-solid fa-trash';
  trashButton.addEventListener('click', () => deleteWork(work));

  imageContainer.appendChild(img);
  imageContainer.appendChild(trashButton);
  workCard.appendChild(imageContainer);
  workCard.appendChild(editButton);
  

  return workCard;
}

async function createGalleryInModal() {
  const gallery = document.createElement('div');
  gallery.classList.add('gallery_modal');
  
  const works = await getWorks(); // Remplace fetchwork() par fetchWorks() pour récupérer les travaux depuis l'API
  
  works.forEach(work => {
    const workDom = createWorkCard(work);
    gallery.appendChild(workDom);
  });

  return gallery;
}

async function deleteWork(workId) {
  try {
    console.log("work ID :", workId);
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const deleteResponse = await fetch(`http://localhost:5678/api/works/${workId.id}`, {
      method: 'DELETE',
      headers: myHeaders
    });

    if (deleteResponse.ok) {
      // Suppression réussie, effectuez les actions nécessaires (par exemple, supprimez l'élément du DOM)
      console.log('Le travail a été supprimé avec succès.');
      refreshGallery(true);
    } else if (deleteResponse.status === 401) {
      // Déconnexion en cas d'erreur 401
      console.error('Erreur 401 : Accès non autorisé');
      logout();
    } else {
      console.error('Une erreur s\'est produite lors de la suppression du travail.');
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la suppression du travail :', error);
  }
}

// Crée le formulaire d'ajout pour un Work
function createWorkForm() {
  // Création des éléments de fermeture et de retour
  const closeButton = createButton('X', closeModal);
  closeButton.classList.add('modal-close-btn');

  const modalReturnButton = createButton('\u2190');
  modalReturnButton.type = 'button';
  modalReturnButton.classList.add('modal-return');
  modalReturnButton.addEventListener('click', () => {
    displayWorksManagerInModal(works);
  });

  // Création du formulaire
  const form = document.createElement('form');

  // Création des divs pour regrouper les éléments
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('form-container');

  const categoryContainer = document.createElement('div');
  categoryContainer.classList.add('form-container');

  const fileInputContainer = document.createElement('div');
  fileInputContainer.classList.add('input-container');

  // Création des champs de saisie de texte
  const titleInput = createTextInput('Titre');

  const categoryInput = createCategoryInput();

  // Création de l'élément pour afficher l'image sélectionnée
  const imagePreview = document.createElement('img');
  imagePreview.style.display = 'none';

  const emptyImage = document.createElement('i');
  emptyImage.classList.add('fa-solid', 'fa-image');

  // Création du champ de téléchargement de fichier
  const fileInput = createFileInput(imagePreview);
  

  // Ajout des écouteurs d'événements
  fileInput.input.addEventListener('change', () => {
    if (fileInput.input.files && fileInput.input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        emptyImage.style.display = 'none';
      };
      reader.readAsDataURL(fileInput.input.files[0]);
    } else {
      imagePreview.style.display = 'none';
      emptyImage.style.display = 'block';
    }
  });

  // Ajout des éléments aux divs
  titleContainer.append(titleInput.label, titleInput.input);
  categoryContainer.append(categoryInput.label, categoryInput.select);

  // Ajout des éléments au conteneur d'entrée de fichier
  fileInputContainer.append(emptyImage, imagePreview, fileInput.label, fileInput.input);

  // Création du bouton de validation
  const submitButton = createButton('Valider', handleSubmit);
  submitButton.classList.add('submitWork');

  // Ajout des divs et des autres éléments au formulaire
  form.append(
    closeButton,
    modalReturnButton,
    fileInputContainer,
    titleContainer,
    categoryContainer,
    submitButton
  );

  return form;
}

// Fonction utilitaire pour créer un bouton avec un texte et un gestionnaire d'événements
function createButton(text, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', clickHandler);
  return button;
}

// Fonction utilitaire pour créer un champ de saisie de texte avec une étiquette
function createTextInput(labelText) {
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.name = 'title'
  input.type = 'text';
  label.textContent = labelText;
  label.appendChild(input);
  return { label, input };
}

// Fonction utilitaire pour créer un champ de saisie de catégorie avec une étiquette
function createCategoryInput() {
  const label = document.createElement('label');
  label.textContent = 'Catégorie';
  const select = document.createElement('select');
  select.name = 'category';


  // Création des options avec les identifiants correspondants
  const options = [
    { id: '1', text: 'Objet' },
    { id: '2', text: 'Hébergement' },
    { id: '3', text: 'Hôtel et Restaurant' }
  ];

  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.text;
    select.appendChild(optionElement);
  });

  label.appendChild(select);
  return { label, select };
}

// Fonction utilitaire pour créer un champ de téléchargement de fichier avec une étiquette
function createFileInput(imagePreview) {
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.name = "image";
  input.type = 'file';
  input.accept = 'image/jpeg, image/png';
  input.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.src = '';
      imagePreview.style.display = 'none';
    }
  });
  label.textContent = 'Fichier (JPEG ou PNG, max. 4 Mo)';
  label.appendChild(input);
  return { label, input };
}

// Gestionnaire d'événements pour le changement de fichier
function handleFileChange(event) {
  const fileInput = event.target;
  const files = fileInput.files;
  const maxFileSize = 4 * 1024 * 1024; // 4 Mo (en octets)

  if (files.length > 0) {
    const file = files[0];
    if (file.size > maxFileSize) {
      alert('Le fichier dépasse la taille maximale autorisée de 4 Mo.');
      fileInput.value = ''; // Réinitialise le champ de fichier
    }
  }
}

// Fonction utilitaire pour créer un bouton avec un texte et un gestionnaire d'événements
function createButton(text, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', clickHandler);
  return button;
}

// Gestionnaire d'événements pour la validation du formulaire
function handleSubmit(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire

  const form = event.target.form;
  const inputs = form.querySelectorAll('input, select');
  
  let allFieldsFilled = true;
  let formData = {}; // Objet pour stocker les données du formulaire

  inputs.forEach(input => {
    if (!input.value) {
      allFieldsFilled = false;
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
      if(input.type == "file" ){
        formData[input.name] = input.files[0];
      } else {
        formData[input.name] = input.value; // Stocke la valeur du champ dans l'objet formData
     }
    }
  });
console.log(formData)
  if (allFieldsFilled) {
    event.target.classList.add('success');
    // Utilisez l'objet formData comme vous le souhaitez
    const { title, category, image } = formData;
    console.log('Titre:', title);
    console.log('workId:', category);
    console.log('Image:', image);

    // Appel de la fonction pour envoyer la requête POST vers l'API
    sendFormData(formData);
  } else {
    event.target.classList.remove('success');
  }
}

// Fonction pour envoyer la requête POST vers l'API avec les données du formulaire
function sendFormData(formData) {
  const token = localStorage.getItem('token');
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  // Création de l'objet FormData pour envoyer les données du formulaire
  const formDataToSend = new FormData();
  formDataToSend.append('title', formData.title);
  formDataToSend.append('image', formData.image);
  formDataToSend.append('category', formData.category);
  formDataToSend.append('userId', 1)

  // Envoi de la requête POST vers l'API
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    body: formDataToSend,
    headers: {
      Authorization: `Bearer ${token}` // Ajoute l'en-tête d'autorisation avec le token
    }
  })
    .then(response => {
      if (response.status === 401) {
        // Déconnexion en cas d'erreur 401
        console.error('Erreur 401 : Accès non autorisé');
        logout();
      } else {
        return response.json();
      }
    })
    .then(data => {
      console.log('Réponse de l\'API:', data);
      if (data.success) {
        closeModal();
      } 
    })

}

// Affiche le formulaire d'ajout dans la modale de la page
function displayFormInModal() {
  const form = createWorkForm();
  displayInModal(form);
}

// Ferme la modale
function closeModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.remove();
    refreshGallery();
  }
}

async function refreshGallery() {
  try {
    // Recharge tous les travaux depuis l'API
    works = await getWorks();

    // Met à jour la galerie principale
    displayGallery(works);

    // Met à jour la galerie de la modal
    const galleryModal = document.querySelector('.gallery_modal');
    galleryModal.innerHTML = "";
    const galleryInModal = await createGalleryInModal();
    galleryModal.appendChild(galleryInModal);
  } catch (error) {
    console.error('Une erreur s\'est produite lors du rafraîchissement de la galerie :', error);
  }
}