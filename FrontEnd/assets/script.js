fetch('http://localhost:5678/api/works')
  .then(r => r.json())
  .then(data => {
    data.forEach(work => {
      const imgURL = document.createElement("img");
      const title = document.createElement("figcaption");
      imgURL.src = work.imageUrl;
      title.innerText = work.title;
      const figure = document.createElement("figure");
      figure.appendChild(imgURL);
      figure.appendChild(title);
      const gallery = document.querySelector('.gallery');
      gallery.appendChild(figure);
    });
  });
  