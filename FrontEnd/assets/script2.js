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
function createImageElement(work, modal) {
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

  if (modal) {
    const modalTrash = createModalTrashImage(work.id);
    imgContainer.appendChild(modalTrash);
    imgContainer.classList.add("image-container");
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

    modifierTexte.addEventListener('click', function(){
      displayWorksManagerInModal();
      console.log("bnt modifié cliqué !")
    })    

    portfolio.insertBefore(projetDiv, portfolio.querySelector('#gallery'));

    // getWorks()
    //   .then(works => {
    //     createModal(1, works);
    //   });

    // function modifierClickHandler() {
    //   console.log('Bouton Modifier cliqué !');

    //   const step = 1;
    //   if (step === 1) {
    //     getWorks()
    //       .then(works => {
    //         createModal(step, works); // Passez les œuvres en paramètre ici
    //       });
  //     }
  //     // Supprimer l'écouteur d'événement une fois que la modale a été créée
  //     modifierTexte.removeEventListener('click', modifierClickHandler);
  //   }

  //   modifierTexte.addEventListener('click', modifierClickHandler);
   }
}

//Modale

// function createModalOverlay() {
//   const modalOverlay = document.createElement('div');
//   modalOverlay.classList.add('modal-overlay');
//   return modalOverlay;
// }


// function createModalContent(step, modalOverlay, works) {
//   const modalContent = document.createElement('div');
//   modalContent.classList.add('modal-content');

//   const modalCloseButton = ModalCloseButton(modalOverlay);

//   modalContent.appendChild(modalCloseButton);

//   if (step === 1) {
//     buildStep1Content(modalContent, works);
//   } else if (step === 2) {
//     buildStep2Content(modalContent);
//   }

//   return modalContent;
// }

// function toggleGallery(modalContent, works) {
//   const modalContainer = document.querySelector('.modal-content');
//   modalContainer.innerHTML = '';

//   const step = modalContent.classList.contains('step1') ? 2 : 1;

//   if (step === 1) {
//     buildStep1Content(modalContainer, works);
//   } else if (step === 2) {
//     buildStep2Content(modalContainer);
//   }
// }

// function createModal(step, works) {
//   const modalContainer = document.querySelector('#gallery');
//   if (!modalContainer) {
//     console.error('L\'élément avec l\'ID "gallery" n\'existe pas.');
//     return;
//   }

//   const modalOverlay = createModalOverlay();
//   const modalContent = createModalContent(step, modalOverlay, works);

//   modalOverlay.addEventListener('click', toggleGallery);


//   modalOverlay.appendChild(modalContent);
//   modalContainer.appendChild(modalOverlay);

//   modalContent.classList.add('show-gallery');
//   displayGalleryInModal(works);

//   const btnAjouterUnePhoto = document.getElementById('btnAjouterUnePhoto');
//   btnAjouterUnePhoto.addEventListener('click', toggleGallery);
// }





// function buildStep1Content(modalContent, works) {
//   const modalTitle = ModalTitle();
//   const modalGallery = createModalGallery(works);
//   modalGallery.id = 'modalGallery'; // Ajoutez l'ID "modalGallery" à l'élément
//   const btnAjouterUnePhoto = ModalButton('Ajouter une photo', 'btn-ajouter', 'btnAjouterUnePhoto');
//   const supprimerLaGallery = ModalParagraph('Supprimer la galerie', 'modal-btn-suprimer', 'modalBtnSuprimer');

//   modalContent.appendChild(modalTitle);
//   modalContent.appendChild(modalGallery);
//   modalContent.appendChild(btnAjouterUnePhoto);
//   modalContent.appendChild(supprimerLaGallery);

//   btnAjouterUnePhoto.addEventListener('click', () => {
//    // Supprime la modale existante
//       createModal(2, works); // Crée une nouvelle modale avec l'étape 2 après un court délai
//     console.log("Btn Ajouter une photo cliqué !");
//   });
// }

// function removeModal() {
//   const modalOverlay = document.querySelector('.modal-overlay');
//   if (modalOverlay) {
//     modalOverlay.remove();
//   }
// }
// function buildStep2Content(modalContent, works) {
//   modalContent.innerHTML = '';
//   const modalReturnButton = document.createElement('button');
//   modalReturnButton.classList = 'fa-solid fa-arrow-left modal-return';
//   modalReturnButton.addEventListener('click', () => {
//     toggleGallery(1, modalContent, works); // Revenir à l'étape 1
//   });

//   const modalForm = createModalForm();
//   modalContent.appendChild(modalReturnButton);
//   modalContent.appendChild(modalForm);
// }

// function createModalForm() {
//   const modalForm = document.createElement('form');
//   modalForm.id = 'ajouterFormulaire';
//   modalForm.classList.add('ajout');

//   const divAjoutImg = createDivAjoutImg();
//   const divInput = createDivInput();

//   const inputElement = document.querySelector('.ajouter-input-input');
//   const selectCategory = document.querySelector('.ajouter-input-input');
  
//   const btnValider = createBtnValider(inputElement, selectCategory); 

//   modalForm.appendChild(divAjoutImg);
//   modalForm.appendChild(divInput);
//   modalForm.appendChild(btnValider);

//   modalForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//   });

//   return modalForm;
// }

// function createDivAjoutImg() {
//   const divAjoutImg = document.createElement('div');
//   divAjoutImg.classList = 'ajouter-image';

//   const logoAjoutImg = document.createElement('i');
//   logoAjoutImg.classList = 'fa-solid fa-image';

//   const btnAjouterImg = document.createElement('input');
//   btnAjouterImg.type = 'file';
//   btnAjouterImg.classList.add('ajouter-btn');
//   btnAjouterImg.textContent = '+ Ajouter photo';

//   const texteAjoutImg = document.createElement('p');
//   texteAjoutImg.classList.add('ajouter-text');
//   texteAjoutImg.textContent = 'jpg, png : 4mo max';

//   btnAjouterImg.addEventListener('change', (event) => {
//     const fichier = event.target.files[0];
//     const url = URL.createObjectURL(fichier);
//     const img = document.createElement('img');
//     img.src = url;

//     divAjoutImg.appendChild(img);
//   });

//   divAjoutImg.appendChild(logoAjoutImg);
//   divAjoutImg.appendChild(btnAjouterImg);
//   divAjoutImg.appendChild(texteAjoutImg);

//   return divAjoutImg;
// }
// function createDivInput() {
//   const divInput = document.createElement('div');
//   divInput.classList = 'ajouter-input';

//   const divInputTitle = document.createElement('div');
//   divInputTitle.classList = 'ajouter-input-div';

//   const inputTitle = document.createElement('p');
//   inputTitle.classList = 'ajouter-input-title';
//   inputTitle.textContent = 'Titre';

//   const inputElement = document.createElement('input');
//   inputElement.classList = 'ajouter-input-input titre';

//   divInputTitle.appendChild(inputTitle);
//   divInputTitle.appendChild(inputElement);

//   const divInputCategory = document.createElement('div');
//   divInputCategory.classList = 'ajouter-input-div';

//   const selectCategory = document.createElement('select');
//   selectCategory.classList = 'ajouter-input-input select';

//   const inputCategoryTitle = document.createElement('p');
//   inputCategoryTitle.classList = 'ajouter-input-title';
//   inputCategoryTitle.textContent = 'Catégorie';

//   const option1 = document.createElement('option');
//   option1.id = '1';
//   option1.textContent = 'Objets';

//   const option2 = document.createElement('option');
//   option2.id = '2';
//   option2.textContent = 'Appartements';

//   const option3 = document.createElement('option');
//   option3.id = '3';
//   option3.textContent = 'Hôtel & restaurants';

//   selectCategory.appendChild(option1);
//   selectCategory.appendChild(option2);
//   selectCategory.appendChild(option3);

//   divInputCategory.appendChild(inputCategoryTitle);
//   divInputCategory.appendChild(selectCategory);

//   divInput.appendChild(divInputTitle);
//   divInput.appendChild(divInputCategory);

//   return divInput;
// }


// function getFormData() {
//   const inputElement = document.querySelector('.ajouter-input-input.titre');
//   const selectElement = document.querySelector('.ajouter-input-input.select');

//   const title = inputElement.value;
//   const category = selectElement.options[selectElement.selectedIndex].id;

//   return { title, category };
// }

// function getImageData() {
//   const imgFile = document.querySelector('input[type=file]').files[0];
//   return imgFile;
// }

// function createBtnValider() {
//   const btnValider = document.createElement('button');
//   btnValider.classList.add('ajouter-btn-valider');
//   btnValider.textContent = 'Valider';

//   btnValider.addEventListener('click', () => {
//     handleValidation();
//   });

//   return btnValider;
// }

// async function handleValidation() {
//   const token = localStorage.getItem('token');
//   const formData = getFormData();
//   const imgFile = getImageData();

//   if (!formData.title || !formData.category || !imgFile) {
//     const defMessage = document.createElement('div');
//     defMessage.classList.add('def-message');
//     defMessage.textContent = 'Erreur : Champ manquant';
//     document.body.appendChild(defMessage);
//     return;
//   }

//   formData.image = imgFile;

//   const formBody = new FormData();
//   formBody.append('title', formData.title);
//   formBody.append('category', formData.category);
//   formBody.append('image', formData.image);

//   try {
//     const response = await fetch('http://localhost:5678/api/works', {
//       method: 'POST',
//       body: formBody,
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     console.log('Data received from API:', data);

//     if (response.ok) {
//       toggleGallery(1, modalContent, works);
//       refreshGallery(true);
//       //Ajouter la logique pour vider les inputs 

//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }




// function createModalGallery(works) {
//   const modalGallery = document.createElement('div');
//   modalGallery.id = 'modalStep1';
//   modalGallery.classList.add('modal-gallery');
  
  
//   works.forEach(work => {
//     const figure = createImageElement(work, true);
//     modalGallery.appendChild(figure);
//   });

//   return modalGallery;
// }



// function ModalTitle() {
//   const modalTitle = document.createElement('h3');
//   modalTitle.textContent = 'Galerie photo';
//   modalTitle.classList.add('modal-title');
//   return modalTitle;
// }

// function ModalCloseButton(modalOverlay) {
//   const modalCloseButton = document.createElement('button');
//   modalCloseButton.classList.add('modal-close');
//   modalCloseButton.textContent = 'X';
//   modalCloseButton.addEventListener('click', () => {
//     modalOverlay.style.display = 'none'; // Fermer la modale en masquant l'overlay
//   });
//   return modalCloseButton;
// }

// function ModalButton(text, className, id) {
//   const button = document.createElement('button');
//   button.textContent = text;
//   button.classList.add(className);
//   button.id = id;
//   return button;
// }

// function ModalParagraph(text, className, id) {
//   const paragraph = document.createElement('p');
//   paragraph.textContent = text;
//   paragraph.classList.add(className);
//   paragraph.id = id;
//   return paragraph;
// }

// function displayGalleryInModal(works) {

//   modalGallery.innerHTML = "";

//   works.forEach(work => {
//     const figure = createImageElement(work, modalGallery);
//     const titleElement = figure.querySelector('figcaption');
//     titleElement.innerText = "éditer";

//     modalGallery.appendChild(figure);

//     const modalTrash = createModalTrashImage(work.id); // Passer l'ID de l'œuvre ici
//     figure.querySelector('.image-container').appendChild(modalTrash);
//     modalGallery.appendChild(figure);
//   });
// }

// function createModalTrashImage(workId) {
//   const modalTrash = document.createElement('span');
//   modalTrash.classList = 'fa-solid fa-trash';
//   modalTrash.id = 'modalTrash';

//   modalTrash.addEventListener('click', async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const myHeaders = new Headers();
//       myHeaders.append('Authorization', `Bearer ${token}`);

//       const deleteResponse = await fetch(`http://localhost:5678/api/works/${workId}`, {
//         method: 'DELETE',
//         headers: myHeaders
//       });

//       if (deleteResponse.ok) {
//         // Suppression réussie, effectuez les actions nécessaires (par exemple, supprimez l'élément du DOM)
//         console.log('Le travail a été supprimé avec succès.');
//         refreshGallery(true);
//       } else {
//         console.error('Une erreur s\'est produite lors de la suppression du travail.');
//       }
//     } catch (error) {
//       console.error('Une erreur s\'est produite lors de la suppression du travail :', error);
//     }
//   });

//   return modalTrash;
// }

// function refreshGallery(modalOpen) {
//   getWorks()
//     .then(works => {
//       displayGallery(works); // Mettre à jour la galerie principale

//       if (modalOpen) {
//         displayGalleryInModal(works); // Mettre à jour la galerie dans la modale seulement si elle est ouverte
//       }
//     })
//     .catch(error => {
//       console.error('Une erreur s\'est produite lors de la récupération des œuvres :', error);
//     });
// }


//************** Nouvelle Modal *********************/

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

// Affiche le gestionnaire de galerie dans la modale
function displayWorksManagerInModal() {
  const worksManager = document.createElement('div');

  const title = document.createElement('h3');
  title.textContent = "Gallerie Photo";

  const closeButton = document.createElement('span');
  closeButton.textContent = "X";
  closeButton.addEventListener('click', closeModal);

  const addWorkBtn = document.createElement('button');
  addWorkBtn.textContent = "Ajouter une photo";
  addWorkBtn.addEventListener('click', displayFormInModal);

  const deleteGallery = document.createElement('button');
  deleteGallery.textContent = "Supprimer la galerie";

  worksManager.appendChild(closeButton);
  worksManager.appendChild(title);
  worksManager.appendChild(addWorkBtn);
  worksManager.appendChild(deleteGallery);

  displayInModal(worksManager);
}

// Crée le formulaire d'ajout pour un Work
function createWorkForm() {
  const closeButton = document.createElement('span');
  closeButton.textContent = "X";
  closeButton.addEventListener('click', closeModal);

  const arrowLeft = '\u2190';
  const modalReturnButton = document.createElement('span');
  modalReturnButton.textContent = arrowLeft;
  modalReturnButton.addEventListener('click', displayWorksManagerInModal);
  
  const form = document.createElement('form');
  const titleLabel = document.createElement('label');
  const titleInput = document.createElement('input');

  const categoryLabel = document.createElement('label');
  const categoryInput = document.createElement('input');

  form.appendChild(closeButton);
  form.appendChild(modalReturnButton);
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(categoryLabel);
  form.appendChild(categoryInput);
  return form;
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
  }
}

