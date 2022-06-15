const url = window.location.href.split('=');
const id = url[1];

fetch(`http://localhost:3001/api/users/${id}`)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data);
    $('#p-name').text(data.name);
    $('#p-nickName').text(data.nickName);
    $('#p-contactEmail').text(data.email);
    $('#p-surname').text(data.surname);
    $('#p-natalCountry').text(data.natalCountry.name);
    if (data.resCountry.name) console.log('a');
    $('#p-residentCountry').text(data.resCountry.name);
    $('#p-natalImg').attr('src', data.natalCountry.flag);
    $('#p-resImg').attr('src', data.resCountry.flag);
    $('#p-image').attr('src', data.image);
    console.log(data.nresCountry.flag);
    paintLanguesAndRoles(data.language, 'langues');
    paintLanguesAndRoles(data.role, 'role');
  });
