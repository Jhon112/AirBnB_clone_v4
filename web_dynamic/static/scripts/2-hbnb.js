$(document).ready(function () {
  handleAmenties();
  getApiStatus();
});

function handleAmenties () {
  const amenities = {};

  $('.amenities .popover li input').change(function (e) {
    const inputData = $(this).data();

    if ($(this).prop('checked') === true) {
      amenities[inputData.name] = inputData.id;
    } else if ($(this).prop('checked') === false) {
      delete amenities[inputData.name];
    }

    const amenitiesList = Object.keys(amenities).join(', ');
    $('.amenities h4').empty().append('&nbsp;', amenitiesList);
  });
}

function getApiStatus () {
  const url = 'http://0.0.0.0:5001/api/v1/status/';

  $.ajax({
    method: 'GET',
    url
  }).done(data => {
    const status = data.status === 'OK';
    $('div#api_status').toggleClass('available', status);
  });
}
