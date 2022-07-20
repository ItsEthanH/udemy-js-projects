export class Map {
  constructor(coords) {
    this.render(coords);
  }

  render(coordinates) {
    if (!google) {
      alert('Could not load maps - please try again later!');
      return;
    }

    const mapInsertion = document.getElementById('map');

    const map = new google.maps.Map(mapInsertion, { center: coordinates, zoom: 16 });
    new google.maps.Marker({ position: coordinates, map });
  }
}
