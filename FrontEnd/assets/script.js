// Afficher les images 
const gallery = document.querySelector('.gallery');

const createImageElement = (work) => {
  const imgURL = document.createElement("img");
  const title = document.createElement("figcaption");

  imgURL.src = work.imageUrl;
  imgURL.setAttribute("data-category", work.category.name);
  title.innerText = work.title;

  const figure = document.createElement("figure");
  figure.appendChild(imgURL);
  figure.appendChild(title);

  return figure;
};

// Filtres  mettre data categorir voir message 14:13
const filters = document.querySelectorAll("#filters button");

const filterClickHandler = (tag) => {

const images = document.querySelectorAll('.gallery img');


  for (const image of images) {
    
    if (tag === 'Tous' || image.getAttribute('data-category') === tag) {
      image.parentElement.style.display = "block"; // Afficher l'élément parent
    } else {
      image.parentElement.style.display = "none"; // Cacher l'élément parent
      }
  }

  // Ajouter ou supprimer la classe "active"
  filters.forEach(filter => {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  });

  this.classList.add("active");
};

    filters.forEach(filter => {
      filter.addEventListener("click", function() {
        const tag = this.id;
        filterClickHandler(tag);
      });
    });

fetch('http://localhost:5678/api/works')
  .then(r => r.json())
  .then(data => {

    data.forEach(work => {
      const imageElement = createImageElement(work);
      gallery.appendChild(imageElement);
    });
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

    // Mettre à jour le contenu de la page d'accueil
    console.log(newButton)
    newButton.addEventListener('click', () => {
     
    });

    // Suprimer les filtres
    document.getElementById('filters').remove();
    document.getElementById('projets').remove();

    
    // BTN modifier
    const figure = document.querySelector('figure');
    figure.id = "figureContainer"

    // Créer un nouvel élément à ajouter à la <figure>
    const figureTexte = document.createElement('div');
    figureTexte.className = "figureTexte"
    const modifierLogo = document.createElement('i')
    modifierLogo.className = "fa-solid fa-pen-to-square";
    const modifier = document.createElement('p');
    modifier.textContent = "Modifier";
    modifier.className  = "figure-modifier";
  
    figureTexte.appendChild(modifier);
    figureTexte.appendChild(modifierLogo);
    figure.appendChild(figureTexte)
    
    // Sélectionner la balise <section id="portfolio">
    const portfolio = document.querySelector('#portfolio');
    
    const projetDiv = document.createElement('div');
    projetDiv.className = "Projets";
    
    // Créer un nouvel élément à ajouter à la <div> Projets
    const modifierTetxe = document.createElement('div');
    modifierTetxe.className = "modifier-texte";
  
    const descriptionLogo = document.createElement('i');
    descriptionLogo.className = "fa-solid fa-pen-to-square";
    
    const description = document.createElement('p');
    description.id = "modifier-Projet"
    
    const title = document.createElement('h2')
    description.textContent = 'Modifier';
    title.textContent = "Mes Projets";
    
    projetDiv.appendChild(title);
    modifierTetxe.appendChild(descriptionLogo);
    modifierTetxe.appendChild(description);
    projetDiv.appendChild(modifierTetxe);
    portfolio.insertBefore(projetDiv, portfolio.querySelector('#gallery'));

    //Modal Gallerie Photo
//sortir la fucntion du if et appeler 
    function createGallery(works) {
      const gallery = document.createElement('div');
      works.forEach(data => {
        const img = document.createElement('img');
        img.src = data.imageUrl;
        img.setAttribute('data-category', data.category.name);
        gallery.appendChild(img);
      });
      return gallery;
    }
    //  a suprimer 
    fetch('http://localhost:5678/api/works')// Appeler fetchWork
    .then(r => r.json())
    .then(data => {
      works = data;
      const gallery = document.querySelector('.gallery');
      data.forEach(work => {
        const imgURL = document.createElement("img");
        imgURL.src = work.imageUrl;
        imgURL.setAttribute("data-category", work.category.name); 
      });
      
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
      modalTitle.textContent = 'Galerie photo';
      modalTitle.classList.add("modal-title");
  
      const modalImageContainer = document.createElement('div');
      modalImageContainer.classList.add('modal-image-container');
      modalImageContainer.id = "modalImageContainer";

      // Ajouter les images à la div modal-image-container
        
      works.forEach(work => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('modal-image');
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.setAttribute('data-work-id', work.id); // Stocker l'ID de l'oeuvre dans l'attribut data
        const textEditer = document.createElement('p');
        textEditer.textContent = "éditer";
        const modalTrash = document.createElement('span');
        modalTrash.classList = 'fa-solid fa-trash';
        modalTrash.id = "modalTrash";
        imgDiv.appendChild(modalTrash);
        imgDiv.appendChild(img);
        imgDiv.appendChild(textEditer);
        modalImageContainer.appendChild(imgDiv);
      
        // Ajouter un événement click à l'image pour supprimer 
        modalTrash.addEventListener('click', async (event) => {
          console.log(event.target.nextSibling);
          const workId = event.target.nextSibling.getAttribute('data-work-id');
           // Récupérer l'ID depuis l'attribut data
           const myHeaders = new Headers();
           const token = localStorage.getItem('token')
           myHeaders.append('Authorization', `Bearer ${token}`);
          let deleteResponse = await fetch(`http://localhost:5678/api/works/${workId}`, { method: 'DELETE',
          headers: myHeaders 
          });
          if (deleteResponse.ok) {
            imgDiv.remove();
          } 
        });
      });
    
    
      // Ajoute les btn de validation
      const btnAjouterUnePhoto = document.createElement('button');
      btnAjouterUnePhoto.textContent = 'Ajouter une photo'
      btnAjouterUnePhoto.classList.add('btn-ajouter');
      btnAjouterUnePhoto.id = "btnAjouterUnePhoto"
      const supprimerLaGallery = document.createElement('p');
      supprimerLaGallery.textContent = 'Supprimer la galerie'; 
      supprimerLaGallery.classList.add('modal-btn-suprimer')
      supprimerLaGallery.id = "modalBtnSuprimer";

      // Ajouter les éléments à la modale
      modalContent.appendChild(modalCloseButton);
      modalContent.appendChild(modalTitle);
      modalContent.appendChild(btnAjouterUnePhoto);
      modalContent.appendChild(supprimerLaGallery);
      modalContent.appendChild(modalImageContainer);
      modalOverlay.appendChild(modalContent);
  
      // Ajouter la modale à la page
      modalContainer.appendChild(modalOverlay);

      //Déplacer les élements
      modalImageContainer.insertAdjacentElement("afterend", btnAjouterUnePhoto);
      btnAjouterUnePhoto.insertAdjacentElement("afterend", supprimerLaGallery);
    
      // Ajouter un événement au bouton de fermeture
      modalCloseButton.addEventListener('click', function() {
        modalOverlay.style.display = 'none';
      });
  
      // Ajouter un événement au bouton qui ouvre la modale
      const modalOpenButton = document.querySelector('#modifier-Projet');
      modalOpenButton.addEventListener('click', function() {
        modalOverlay.style.display = 'block';
      });
      
    
      //Ajouter un événement au bouton "Ajouter une photo", pour changer l'apparence de la modal
      btnAjouterUnePhoto.addEventListener('click', () => {
        //Ajouter les nouveaux éléments de la modal
        const modalForm = document.createElement('form');
        modalForm.id = "ajouterFormulaire"
        const modalReturnButton = document.createElement('button');
        modalReturnButton.classList = 'fa-solid fa-arrow-left modal-return';
        // Ajouter un événement au bouton de fermeture
        modalReturnButton.addEventListener('click',(modalOpenButton));
        console.log()
        //Panneau photo
        const divAjoutImg = document.createElement('div');
        divAjoutImg.classList = "ajouter-image";

        const logoAjoutImg = document.createElement('i');
        logoAjoutImg.classList = 'fa-solid fa-image';

        const btnAjouterImg = document.createElement('input');
        btnAjouterImg.type = 'file'
        btnAjouterImg.classList.add('ajouter-btn');
        btnAjouterImg.textContent = '+ Ajouter photo';

        const texteAjoutImg = document.createElement('p');
        texteAjoutImg.classList.add('ajouter-text');
        texteAjoutImg.textContent = "jpg, png : 4mo max"

        btnAjouterImg.addEventListener('change', (event) => {

          // On récupère le ficiher sélectionné
          const fichier = event.target.files[0];
          //Créer un url d'objet pour le fichier 
          const url = URL.createObjectURL(fichier);
          //Créer un élément "img" 
          const img =document.createElement('img');
          img.src = url;
          
          //Ajouter l'image au panneau photo
          divAjoutImg.appendChild(img);
        });
        
       
        //Input Titre
        const divInput = document.createElement('div');
        divInput.classList = "ajouter-input";

        const divInputTitle = document.createElement('div');
        divInputTitle.classList = 'ajouter-input-div';
        const inputTitle = document.createElement('p');
        inputTitle.classList = 'ajouter-input-title';
        inputTitle.textContent = "Titre";
        const Input = document.createElement('input');
        Input.classList = 'ajouter-input-input';
        divInputTitle.appendChild(inputTitle);
        divInputTitle.appendChild(Input)
        //Menu Déroulant
        const divInputcategory = document.createElement('div');
        divInputcategory.classList = 'ajouter-input-div';
        
        const selectCategory = document.createElement('select');
        selectCategory.classList = 'ajouter-input-input';
        
        const inputCategoryTitle = document.createElement('p');
        inputCategoryTitle.classList = 'ajouter-input-title';
        inputCategoryTitle.textContent = "Catégorie";
      
        const option1 = document.createElement('option');
        option1.id = "1";
        option1.textContent = 'Objets';
        
        const option2 = document.createElement('option');
        option2.id = "2";
        option2.textContent = 'Appartements';
        
        const option3 = document.createElement('option');
        option3.id = "3";        
        option3.textContent = 'Hôtel & restaurants';
        
        selectCategory.appendChild(option1);
        selectCategory.appendChild(option2);
        selectCategory.appendChild(option3);
        
        divInputcategory.appendChild(inputCategoryTitle);
        divInputcategory.appendChild(selectCategory);
        
     
        // Bouton Valider
        const btnValider = document.createElement('button');
        btnValider.classList.add('ajouter-btn-valider');  
        btnValider.textContent = 'Valider';

        const imgForm = document.querySelector("form");
        imgForm.addEventListener('submit', addImg);


        async function addImg(e) {
          e.preventDefault();

        
          const token = localStorage.getItem('token');
        
          const formData = new FormData();
          formData.append('title', Input.value);
          const categoryID = selectCategory.options[selectCategory.selectedIndex].id;
          formData.append('category', categoryID);
          console.log( categoryID)
          const imgFile = document.querySelector('input[type=file]').files[0];
          formData.append('image', imgFile);


            // Vérifier si les champs nécessaires ont une valeur
            if (!Input.value || !selectCategory.value || !imgFile) {
             const defMessage = document.createElement("div");
              defMessage.classList.add('def-message');
              defMessage.textContent = 'Erreur : Champ manquant';
              document.body.appendChild(defMessage);
              return;
                }
        
          const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const defMessage = document.createElement("div");
          defMessage.classList.add('def-message');
          defMessage.textContent = 'Erreur : Champ manquant';
          console.log(defMessage)        
          const data = await response.json();
          console.log('Data received from API:', data);
          if (response.ok) {
              modalOverlay.style.display = 'none';  //Metrre la fonction de retour ICI
            };
        }
        const imgForm1 = document.querySelector('form');
        imgForm1.addEventListener('submit', addImg);
        modalForm.addEventListener('submit', addImg);
        btnValider.addEventListener('click', addImg);
      

        //Ajout à la modal
        divAjoutImg.appendChild(logoAjoutImg);
        divAjoutImg.appendChild(btnAjouterImg);
        divAjoutImg.appendChild(texteAjoutImg);
        divInput.appendChild(divInputTitle);
        divInput.appendChild(divInputcategory);
        modalContent.appendChild(modalReturnButton);
        modalForm.appendChild(divAjoutImg);
        modalForm.appendChild(divInput);
        modalContent.appendChild(modalForm)
        modalForm.appendChild(btnValider);

        //Supprimer les éléments
        document.getElementById('modalBtnSuprimer').remove();
        document.getElementById('modalImageContainer').remove();
        document.getElementById('btnAjouterUnePhoto').remove();
        //Modifier le titre
        modalTitle.textContent = "Ajout photo";
      })
    }); 
}
