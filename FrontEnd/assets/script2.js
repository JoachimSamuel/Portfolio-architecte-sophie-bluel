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

function getToken() {
  // Code pour récupérer le token à partir de la variable ou du mécanisme de stockage approprié
  const token = localStorage.getItem('token'); // Exemple d'utilisation du Local Storage

  return token;
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
      openModal();
      displayWorksManagerInModal(works);
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

function openModal() {
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  displayInModal(modalContent);
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


// Affiche le gestionnaire de galerie dans la modale
async function displayWorksManagerInModal(works) {
  const worksManager = document.createElement('div');

  const title = document.createElement('h3');
  title.textContent = "Galerie Photo";

  const closeButton = document.createElement('span');
  closeButton.textContent = "X";
  closeButton.addEventListener('click', closeModal);

  const addWorkBtn = document.createElement('button');
  addWorkBtn.textContent = "Ajouter une photo";
  addWorkBtn.addEventListener('click', displayFormInModal);

  const deleteGallery = document.createElement('button');
  deleteGallery.textContent = "Supprimer la galerie";

  const gallery = await createGalleryInModal(); 

  worksManager.appendChild(closeButton);
  worksManager.appendChild(title);
  worksManager.appendChild(gallery);
  worksManager.appendChild(addWorkBtn);
  worksManager.appendChild(deleteGallery);

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

  const trashButton = document.createElement('button');
  trashButton.classList.add('trash');
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
    } else {
      console.error('Une erreur s\'est produite lors de la suppression du travail.');
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la suppression du travail :', error);
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



// Crée le formulaire d'ajout pour un Work
function createWorkForm() {
  // Création des éléments de fermeture et de retour
  const closeButton = createButton('X', closeModal);
  const modalReturnButton = createButton('\u2190', displayWorksManagerInModal);

  // Création du formulaire
  const form = document.createElement('form');

  // Création des champs de saisie de texte
  const titleInput = createTextInput('Titre');
  const categoryInput = createCategoryInput();

  // Création de l'élément pour afficher l'image sélectionnée
  const imagePreview = document.createElement('img');
  imagePreview.style.display = 'none';

  // Création du champ de téléchargement de fichier
  const fileInput = createFileInput(imagePreview);

  // Création du bouton de validation
  const submitButton = createButton('Valider', handleSubmit);

  // Ajout des éléments au formulaire
  form.append(
    closeButton,
    modalReturnButton,
    titleInput.label,
    titleInput.input,
    categoryInput.label,
    categoryInput.select,
    fileInput.label,
    fileInput.input,
    imagePreview,
    submitButton
  );

  return form;
}


// Fonction utilitaire pour créer un bouton avec un texte et un gestionnaire d'événements
function createButton(text, clickHandler) {
  const button = document.createElement('span');
  button.textContent = text;
  button.addEventListener('click', clickHandler);
  return button;
}

// Fonction utilitaire pour créer un champ de saisie de texte avec une étiquette
function createTextInput(labelText) {
  const label = document.createElement('label');
  const input = document.createElement('input');
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
  const inputs = form.querySelectorAll('input[type="text"], select');
  let allFieldsFilled = true;
  let formData = {}; // Objet pour stocker les données du formulaire

  inputs.forEach(input => {
    if (!input.value) {
      allFieldsFilled = false;
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
      formData[input.name] = input.value; // Stocke la valeur du champ dans l'objet formData
    }
  });

  if (allFieldsFilled) {
    event.target.classList.add('success');
    // Utilisez l'objet formData comme vous le souhaitez
    const { title, category, image } = formData;
    console.log('Titre:', title);
    console.log('ID de catégorie:', category);
    console.log('Image:', image);

    // Appel de la fonction pour envoyer la requête POST vers l'API
    sendFormData(formData);
  } else {
    event.target.classList.remove('success');
  }
}
// Fonction pour envoyer la requête POST vers l'API avec les données du formulaire
function sendFormData(formData, token) {
 // const token = getToken();
  //if (token) {
    // Création de l'objet FormData pour envoyer les données du formulaire
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('imageUrl', formData.image);
    formDataToSend.append('categoryId', formData.category);

    // Envoi de la requête POST vers l'API
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formDataToSend,
      headers: {
        Authorization: `Bearer ${token}` // Ajoute l'en-tête d'autorisation avec le token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Réponse de l\'API:', data);
        if (data.success) {
          displayWorksManagerInModal();
        } else {
          // Gérer la réponse en cas d'échec de l'API
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
        // Gérer les erreurs ici
      });
  //}
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
