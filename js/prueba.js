import { tryLogin } from './controllers/login.js';
import { userAndPassword } from './controllers/validation.js';
import { paintSelect, addRoleLang, deleteRoleLang, paintRoleLang, addClub } from './controllers/paint_selects.js';
import { validateDate, paintSlashDate, validateReuired } from './controllers/validation.js';
import { list_langues, list_roles, clubs } from './controllers/paint_selects.js';

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
  const email = $('#edit-email').val().trim();
  const password = $('#edit-password').val().trim();
  const name = $('#edit-name').val().trim();
  const surname = $('#edit-surname').val().trim();
  const contactEmail = $('#edit-contactEmail').val().trim();
  const nickName = $('#edit-nickName').val().trim();
  const natalCountry = $('#edit-natal_country option:selected').val();
  const residentCountry = $('#edit-resident_country option:selected').val();
  const linkTwitter = $('#edit-twitter').val().trim();
  const linkVlr = $('#edit-twitch').val().trim();
  const linkTwitch = $('#edit-vlr').val().trim();
  let list_clubs = [];
  clubs.forEach((ele) => {
    const c = ele.name.split(' - ');
    list_clubs.push({
      idClub: ele.id,
      entryDate: c[1],
      exitDate: c[2],
    });
  });
  const objJson = {
    email,
    password,
    name,
    surname,
    nickName,
    contactEmail,
    natalCountry,
    residentCountry,
    linkTwitch,
    linkTwitter,
    linkVlr,
    list_langues,
    list_roles,
    list_clubs,
  };
  const errors = validateReuired(objJson, 'register');
  if (errors !== true) {
    errors.forEach((ele) => {
      $(`#edit-error-${ele.name}`).text(ele.error);
    });
  } else {
    const file = $('#edit-image').prop('files')[0];
    $('#edit-error-image').text('');
    if (document.getElementById('edit-image').value !== '') {
      if (file.size < 100000) {
        let reader = new FileReader();
        reader.onloadend = () => {
          objJson.image = reader.result;
          const url = `http://localhost:3001/api/users`;
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(objJson),
          })
            .then((resp) => resp.json())
            .then((data) => {});
        };
        reader.readAsDataURL(file);
      } else {
        $('#edit-error-image').text('Image size must be less than 100KB');
      }
    } else {
      objJson.image = '';
      const url = `http://localhost:3001/api/users`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objJson),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert(data.succes);
            location.reload();
          }
        });
    }
  }
});

$('#index-login').click(function () {
  const user = $('#index-email_login').val().trim();
  const pass = $('#index-password').val().trim();
  const flag = userAndPassword(user, pass);
  console.log(flag);
  if (flag !== true) {
    $('#login-error').empty();
    console.log('entra');
    flag.forEach((ele) => {
      $('#login-error').append(`<p>${ele.error} <p>`);
    });
  } else if (flag === true) tryLogin(user, pass);
});
