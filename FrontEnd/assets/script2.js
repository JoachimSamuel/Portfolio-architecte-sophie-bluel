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


