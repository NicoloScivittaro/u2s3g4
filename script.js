const getCats = function () {
  const getCats = function (query = 'cats') {
    // Recuperiamo la lista di eventi attualmente nel database
    fetch(`https://api.pexels.com/v1/search?query=${query}`, {
      method: 'GET',
      headers: {
        Authorization: "Bearer ToFCCSiJOxb2isjz8VubbC8zO7PFkWrKCq1irh5cjq1gkEtdkqo1PcOO"
      }
    })
  .then((response) => {
    if (response.ok) {
      return response.json(); // Riceviamo l'oggetto JSON
    } else {
      throw new Error('Errore nella risposta del server');
    }
  })
  .then((data) => {
    console.log('ARRAY!', data); // Verifica la struttura dell'oggetto
    const arrayOfCats = data.photos; // Estrai l'array 'photos'
    const row = document.getElementById('events-row');
    arrayOfCats.forEach((cat) => {
      const newCol = document.createElement('div');
      newCol.classList.add('col');
      newCol.innerHTML = `
        <div class="card h-100 d-flex flex-column">
          <img src="${cat.src.medium}" alt="${cat.photographer}">
          <div class="card-body d-flex flex-column justify-content-around">
            <h5 class="card-title">${cat.id}</h5>
            <p class="card-text">${cat.photographer}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-primary">Edit</button>
              <a href="${cat.url}" class="btn btn-info">INFO</a>
            </div>
          </div>
        </div>
      `;
      row.appendChild(newCol);
    });
  })
  .catch((err) => {
    console.log('ERRORE!', err);
  });
}

getCats();

  // Carica immagini iniziali all'avvio
  document.getElementById('loadImagesBtn').addEventListener('click', function () {
    getCats('cats');
  });

  // Aggiungi event listener al bottone per caricare immagini secondarie
  document.getElementById('load-secondary-images').addEventListener('click', function () {
    getCats('secondary-query');
  });

  // Aggiungi event listener per nascondere la card quando si preme "Hide"
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('hide-btn')) {
      event.target.closest('.col-md-4').remove();
    }
  });

  // Aggiungi event listener per visualizzare l'immagine in un modale
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('view-btn')) {
      const src = event.target.dataset.src;
      const photographer = event.target.dataset.photographer;
      showModal(src, photographer);
    }
  });

  // Funzione per mostrare il modale con l'immagine
  function showModal(src, photographer) {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('caption');

    modal.style.display = 'block';
    modalImg.src = src;
    captionText.innerHTML = `<p>Photographer: ${photographer}</p>`;

    // Chiudi il modale quando si clicca sull'area intorno all'immagine
    modal.onclick = function () {
      modal.style.display = 'none';
    }
  }
}