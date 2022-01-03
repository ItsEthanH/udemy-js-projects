const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const addMovieHandler = function () {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    id: Math.random(),
    info: {
      title,
      [extraName]: extraValue,
    },
  };

  movies.push(newMovie);
  renderMovies();
};

const renderMovies = function () {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
  } else {
    movieList.classList.add('visible');
  }

  movieList.innerHTML = '';

  movies.forEach((movie) => {
    const movieElement = document.createElement('li');
    movieElement.textContent = movie.info.title;
    movieList.append(movieElement);
  });
};

addMovieBtn.addEventListener('click', addMovieHandler);
