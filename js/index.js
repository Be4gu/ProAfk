import { login } from './controllers/login.js';
import { registerUser } from './controllers/requests.js';
import { userAndPassword } from './controllers/validation.js';
import { paintSelect, addRoleLang, deleteRoleLang, addClub } from './controllers/paint_selects.js';
import { validateDate, paintSlashDate } from './controllers/validation.js';
import { urlBase } from './controllers/url.js';

paintSelect('languages', 'langues');
paintSelect('roles', 'roles');
paintSelect('clubs', 'clubs');
paintSelect('countries', 'natal_country');
paintSelect('countries', 'resident_country');

$('#edit-add-clubs-btn').click(function () {
  const flag = validateDate('#edit-start_date', '#edit-end_date');
  if (flag === true) {
    $('#edit-errors_club').text('');
    addClub();
  } else {
    $('#edit-errors_club').text(flag.error);
  }
});
$('#edit-add-langues-btn').click(function () {
  addRoleLang('langues');
});
$('#edit-add-roles-btn').click(function () {
  addRoleLang('roles');
});
$('#edit-delete-roles-btn').click(function () {
  deleteRoleLang('roles');
});
$('#edit-delete-clubs-btn').click(function () {
  deleteRoleLang('clubs');
});
$('#edit-delete-langues-btn').click(function () {
  deleteRoleLang('langues');
});
$('#edit-start_date').keyup(function () {
  paintSlashDate('start');
});
$('#edit-end_date').keyup(function () {
  paintSlashDate('end');
});
$('#edit-register').click(function () {
  registerUser(urlBase);
});

$('#index-login').click(function () {
  const user = $('#index-email_login').val().trim();
  const pass = $('#index-password').val().trim();
  const flag = userAndPassword(user, pass);
  if (flag !== true) {
    $('#login-error').empty();
    console.log('entra');
    flag.forEach((ele) => {
      $('#login-error').append(`<p class="text-center">${ele.error} <p>`);
    });
  } else if (flag === true) login(user, pass);
});
