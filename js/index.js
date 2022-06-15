if (!window.localStorage.log) {
  window.location.replace('../../index.html');
} else {
  $('#spinner').addClass('hidden');
  $('#body').removeClass('hidden');
}

//Importa las funciones
import { paintSelect, addRoleLang, deleteRoleLang, paintRoleLang, addClub } from './controllers/paint_selects.js';
import { validateDate, paintSlashDate, validateReuired } from './controllers/validation.js';
import { user } from './controllers/paint_profile.js';

//Impoorta las variables
import { list_langues, list_roles, clubs } from './controllers/paint_selects.js';

const log = JSON.parse(window.localStorage.getItem('log'));
const idUser = log.id;
console.log(idUser);
user(idUser);

paintSelect('languages', 'langues');
paintSelect('roles', 'roles');
paintSelect('clubs', 'clubs');

fetch(`http://localhost:3001/api/users/${idUser}`)
  .then((resp) => resp.json())
  .then(function (data) {
    $('#edit-name').val(data.name);
    $('#edit-nickName').val(data.nickName);
    $('#edit-contactEmail').val(data.email);
    $('#edit-surname').val(data.surname);
    $('#edit-twitter').val(data.linkTwitter);
    $('#edit-vlr').val(data.linkVlr);
    $('#edit-twitch').val(data.linkTwitch);
    data.language.forEach((element) => {
      list_langues.push(element);
    });

    data.role.forEach((element) => {
      list_roles.push(element);
    });
    paintRoleLang('langues', data.language);
    paintRoleLang('roles', data.role);
    let cad;
    data.clubs.forEach((ele) => {
      cad = ele.idClub.name + ' - ' + ele.entryDate + ' - ' + ele.exitDate;
      clubs.push({ name: cad, id: ele.idClub.id });
    });
    paintRoleLang('clubs', clubs);
    paintSelect('countries', 'natal_country', data.natalCountry.name);
    paintSelect('countries', 'resident_country', data.resCountry.name);
  });

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

$('#edit-save').click(function createJson() {
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
  console.log(list_clubs);
  const objJson = {
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
  const errors = validateReuired(objJson);
  if (errors !== true) {
    errors.forEach((ele) => {
      $(`#edit-error-${ele.name}`).text(ele.error);
    });
  } else {
    const file = $('#edit-image').prop('files')[0];
    const token = JSON.parse(window.localStorage.getItem('log'));
    console.log(token);
    if (file !== undefined) {
      saveImage(file, idUser);
    }
    const url = `http://localhost:3001/api/users/${idUser}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`,
      },
      body: JSON.stringify(objJson),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
    // }
  }
});

function saveImage(input, id_user) {
  let reader = new FileReader();
  reader.onloadend = () => {
    const url = `http://localhost:3001/api/users/image/${id_user}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: reader.result }),
    })
      .then((resp) => resp.json())
      .then((data) => {});
  };
  reader.readAsDataURL(input);
}
