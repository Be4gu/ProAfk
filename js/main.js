import { paintSelect } from './controllers/paint_selects.js';
import { filter, search } from './controllers/browser.js';
import { urlBase } from './controllers/url.js';
import { getToken } from './controllers/login.js';
import { paintModalMenu } from './controllers/paint_profile.js';

const idUser = getToken();
if (idUser) {
  paintModalMenu(urlBase, idUser);
}

paintSelect('languages', 'langues');
paintSelect('countries', 'natal_country');
paintSelect('countries', 'resident_country');

$('#filter-search').click(function () {
  filter(urlBase);
});

$('#main-search').keyup(function () {
  search(urlBase);
});
