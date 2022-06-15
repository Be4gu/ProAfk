import { urlBase } from './controllers/url.js';
import { paintLanguesAndRoles } from './controllers/paint_profile.js';
import { getToken } from './controllers/login.js';
import { paintModalMenu, paintClubs } from './controllers/paint_profile.js';

const url = window.location.href.split('=');
const id = url[1];
const idUser = getToken();
if (idUser) {
  paintModalMenu(urlBase, idUser);
}

fetch(`${urlBase}users/${id}`)
  .then((resp) => resp.json())
  .then(function (data) {
    $('#p-name').text(data.name);
    $('#p-nickName').text(data.nickName);
    $('#p-contactEmail').text(data.email);
    $('#p-surname').text(data.surname);
    $('#p-natalCountry').text(data.natalCountry.name);
    $('#p-residentCountry').text(data.resCountry.name);
    $('#p-contactEmail').text(data.contactEmail);

    $('#p-natalImg').attr('src', data.natalCountry.flag);
    $('#p-resImg').attr('src', data.resCountry.flag);
    $('#p-image').attr('src', data.image);
    $('#p-twitter').attr('href', data.linkTwitter);
    $('#p-twitch').attr('href', data.linkTwitch);
    $('#p-vlr').attr('href', data.linkVlr);

    paintLanguesAndRoles(data.language, '#p-langues');
    paintLanguesAndRoles(data.role, '#p-role');
    paintClubs(data.clubs);
  });
