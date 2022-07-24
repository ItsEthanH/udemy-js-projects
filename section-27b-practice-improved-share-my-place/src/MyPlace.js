import { Map } from './ui/Map';

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);

    const headerTitleElement = document.querySelector('header h1');
    headerTitleElement.textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;

const locId = queryParams.get('location');

fetch('http://localhost:3000/location/' + locId)
  .then((response) => {
    if (response.status === 404) {
      throw new Error('Could not find location!');
    }
    response.json();
  })
  .then((data) => {
    new LoadedPlace(data.coordinates, data.address);
  })
  .catch((err) => alert(err.message));
