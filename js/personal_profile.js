import { getToken, isLoged } from './controllers/login.js';
isLoged();

//Import function
import { addRoleLang, deleteRoleLang, addClub } from './controllers/paint_selects.js';
import { validateDate, paintSlashDate } from './controllers/validation.js';
import { user } from './controllers/paint_profile.js';
import { editProfileSave, createJson, editProfileGetInfo } from './controllers/requests.js';

//Impoort vars
import { urlBase } from './controllers/url.js';

const id = getToken();
user(id, urlBase);
editProfileGetInfo(urlBase, id);

//Events buttons edit page
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

$('#edit-save').click(function () {
  editProfileSave(createJson(), id, urlBase);
});
