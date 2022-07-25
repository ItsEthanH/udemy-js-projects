const addMovieModalButton = document.querySelector('header button');
const entryText = document.getElementById('entry-text');
const movieListUI = document.getElementById('movie-list');

const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const userInputs = document.querySelectorAll('input');
const addMovieButton = document.querySelector('.btn--success');
const cancelMovieButton = document.querySelector('.btn--passive');

const deleteModal = document.getElementById('delete-modal');
const deleteText = document.querySelector('#delete-modal .modal__content');
const deleteMovieButton = document.getElementById('movie-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');

let moviesDatabase = [];
let movieIndex = 0;

function updateUI() {
  if (moviesDatabase.length === 0) {
    entryText.style.display = 'block';
  } else {
    entryText.style.display = 'none';
  }
}

function clearInputs() {
  for (const input in userInputs) {
    userInputs[input].value = '';
  }
}

function toggleMovieModal() {
  addMovieModal.classList.toggle('visible');
  backdrop.classList.toggle('visible');
  clearInputs();
}

function toggleDeleteModal() {
  deleteModal.classList.toggle('visible');
  backdrop.classList.toggle('visible');
}

function clearAllModals() {
  addMovieModal.classList.remove('visible');
  deleteModal.classList.remove('visible');
  backdrop.classList.remove('visible');
  clearInputs();
}

function selectMovieToDelete(movieId, title) {
  movieIndex = 0;
  for (const movie of moviesDatabase) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }

  deleteText.textContent = `Are you sure you want to delete ${title}? This action cannot be undone!`;
  toggleDeleteModal();
}

function deleteSelectedMovie() {
  moviesDatabase.splice(movieIndex, 1);
  movieListUI.children[movieIndex].remove();
  updateUI();
  clearAllModals();
}

function renderMovie(id, title, image, rating) {
  const newListElement = document.createElement('li');
  newListElement.className = 'movie-element';
  newListElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${image}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 Stars</p>
  </div>
  `;
  newListElement.addEventListener(
    'click',
    selectMovieToDelete.bind(null, id, title)
  );
  movieListUI.append(newListElement);
}

function addMovie() {
  //Assigns user input to an object
  const movieToAdd = {
    id: Math.random().toString(),
    title: userInputs[0].value,
    image: userInputs[1].value,
    rating: userInputs[2].value,
  };

  if (
    movieToAdd.title === '' ||
    movieToAdd.image === '' ||
    movieToAdd.rating === '' ||
    movieToAdd.rating > 5 ||
    movieToAdd.rating < 0
  ) {
    alert('Please use valid inputs.');
  } else {
    moviesDatabase.push(movieToAdd);
    clearInputs();
    toggleMovieModal();
    renderMovie(
      movieToAdd.id,
      movieToAdd.title,
      movieToAdd.image,
      movieToAdd.rating
    );
    updateUI();
  }
}

addMovieModalButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', clearAllModals);
addMovieButton.addEventListener('click', addMovie);
cancelMovieButton.addEventListener('click', toggleMovieModal);

deleteMovieButton.addEventListener('click', deleteSelectedMovie);
cancelDeleteButton.addEventListener('click', clearAllModals);
