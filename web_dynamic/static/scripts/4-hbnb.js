$(document).ready(function () {
  const amenities = {};

  $('.amenities .popover li input').change(function (e) {
    handleAmenties(amenities, this);
  });

  getApiStatus().then(status => {
    if (status === 'OK') {
      fetchPlaces();
      $('button').click(function (e) {
        const listAmenities = { amenities: Object.values(amenities) };
        fetchPlaces(listAmenities);
      });
    }
  });
});

function handleAmenties (amenities, amenity) {
  const inputData = $(amenity).data();

  if ($(amenity).prop('checked') === true) {
    amenities[inputData.name] = inputData.id;
  } else if ($(amenity).prop('checked') === false) {
    delete amenities[inputData.name];
  }

  const amenitiesList = Object.keys(amenities).join(', ');
  $('.amenities h4')
    .empty()
    .append('&nbsp;', amenitiesList);
}

function getApiStatus () {
  return new Promise((resolve, reject) => {
    const url = 'http://0.0.0.0:5001/api/v1/status/';

    $.ajax({
      method: 'GET',
      url
    }).done(data => {
      const status = data.status === 'OK';
      $('div#api_status').toggleClass('available', status);
      status ? resolve('OK') : resolve('DOWN');
    });
  });
}

function fetchPlaces (amenities = {}) {
  const url = 'http://0.0.0.0:5001/api/v1/places_search/';

  $.ajax({
    method: 'POST',
    url,
    contentType: 'application/json',
    data: JSON.stringify(amenities)
  }).done(data => {
    $('section.places').empty();
    data.forEach(place => {
      const article = `
        <article>
          <div class='title'>
            <h2>${place.name} </h2>
            <div class='price_by_night'>
              ${place.price_by_night}
            </div>
          </div>
          <div class='information'>
            <div class='max_guest'>
              <i class='fa fa-users fa-3x' aria-hidden='true'></i>
              <br />
              ${place.max_guest} Guests
            </div>
            <div class='number_rooms'>
              <i class='fa fa-bed fa-3x' aria-hidden='true'></i>
              <br />
              ${place.number_rooms} Bedrooms
            </div>
            <div class='number_bathrooms'>
              <i class='fa fa-bath fa-3x' aria-hidden='true'></i>
              <br />
              ${place.number_bathrooms} Bathroom
            </div>
          </div>
          <div class='description'>
            ${place.description}
          </div>
        </article>`;
      $('section.places').append(article);
    });
  });
}
