import { Modal } from './ui/Modal';
import { Map } from './ui/Map';
import { getAddressFromCoords, getCoordFromAddress } from './util/Location';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');
    this.sharedLinkInputElement = document.getElementById('share-link');

    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Location feature is not available with your browser. Please use a modern browser or manually enter your address below.'
      );
      return;
    }

    const modal = new Modal('loading-modal-content', 'Loading location - please wait!');
    modal.show();

    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };

        const address = await getAddressFromCoords(coordinates);
        this.selectPlace(coordinates, address);
        modal.hide();
      },
      (errorResult) => {
        modal.hide();
        alert('Your location could not be found. Please enter a location manually!');
      }
    );
  }

  selectPlace(coordinates, address) {
    // if we already have a map, it gets reused. just in case we get the user location twice in a row
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    fetch('http://localhost:3000/add-location', {
      method: 'POST',
      body: JSON.stringify({
        address: address,
        lat: coordinates.latitude,
        lng: coordinates.lng,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    this.sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(
      address
    )}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
    this.shareBtn.disabled = false;
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;

    if (!address || address.trim().length === 0) {
      alert('Invalid address entered - please try again!');
    }

    const modal = new Modal('loading-modal-content', 'Loading location - please wait!');
    modal.show();

    try {
      const coordinates = await getCoordFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    } finally {
      modal.hide();
    }
  }

  sharePlaceHandler() {
    if (!navigator.clipboard) {
      this.sharedLinkInputElement.select();
      return;
    }

    navigator.clipboard
      .writeText(this.sharedLinkInputElement.value)
      .then(() => {
        alert('Copied into clipboard!');
      })
      .catch((err) => {
        console.log(err);
        this.sharedLinkInputElement.select();
      });
  }
}

new PlaceFinder();
