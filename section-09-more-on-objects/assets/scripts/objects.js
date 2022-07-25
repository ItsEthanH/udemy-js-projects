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

const renderMovies = function (filter = '') {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
  } else {
    movieList.classList.add('visible');
  }

  movieList.innerHTML = '';

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieElement = document.createElement('ul');
    const movieElementTitle = document.createElement('li');
    const movieElementInfo = document.createElement('li');

    let titleText = `${movie.info.title}`;
    let infoText;

    for (const key in movie.info) {
      if (key !== 'title') {
        infoText = `${key}: ${movie.info[key]}`;
      }
    }

    movieElementTitle.textContent = titleText;
    movieElementInfo.textContent = infoText;

    movieElement.classList.add('movie-item');
    movieElementTitle.classList.add('movie-title');
    movieElementInfo.classList.add('movie-info');

    movieElement.append(movieElementTitle);
    movieElement.append(movieElementInfo);
    movieList.append(movieElement);
  });
};

const searchMovieHandler = function () {
  const searchTerm = document.getElementById('filter-title').value;
  renderMovies(searchTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
