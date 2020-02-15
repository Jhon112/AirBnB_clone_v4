$(document).ready(function () {
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
});
