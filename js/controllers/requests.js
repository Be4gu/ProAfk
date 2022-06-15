import { list_langues, list_roles, clubs } from './paint_selects.js';
import { paintSelect, paintRoleLang } from './paint_selects.js';
import { validateReuired } from './validation.js';

function editProfileGetInfo(urlBase, idUser) {
  paintSelect('languages', 'langues');
  paintSelect('roles', 'roles');
  paintSelect('clubs', 'clubs');

  fetch(`${urlBase}users/${idUser}`)
    .then((resp) => resp.json())
    .then(function (data) {
      $('#edit-name').val(data.name);
      $('#edit-nickName').val(data.nickName);
      $('#edit-contactEmail').val(data.email);
      $('#edit-surname').val(data.surname);
      $('#edit-twitter').val(data.linkTwitter);
      $('#edit-vlr').val(data.linkVlr);
      $('#edit-twitch').val(data.linkTwitch);
      if (data.status) {
        $('#edit-status').prop('checked', true);
      } else {
        $('#edit-status').prop('checked', false);
      }
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
      if (data.resCountry.name !== '') paintSelect('countries', 'resident_country', data.resCountry.name);
    });
}

function createJson() {
  const name = $('#edit-name').val().trim();
  const surname = $('#edit-surname').val().trim();
  const contactEmail = $('#edit-contactEmail').val().trim();
  const nickName = $('#edit-nickName').val().trim();
  const natalCountry = $('#edit-natal_country option:selected').val();
  const residentCountry = $('#edit-resident_country option:selected').val();
  const linkTwitter = $('#edit-twitter').val().trim();
  const linkVlr = $('#edit-twitch').val().trim();
  const linkTwitch = $('#edit-vlr').val().trim();
  const status = $('#edit-status').is(':checked');
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
    status,
  };
  return objJson;
}

function editProfileSave(objJson, idUser, urlBase) {
  const errors = validateReuired(objJson);
  if (errors !== true) {
    errors.forEach((ele) => {
      $(`#edit-error-${ele.name}`).text(ele.error);
    });
  } else {
    const file = $('#edit-image').prop('files')[0];
    const token = JSON.parse(window.localStorage.getItem('log'));
    $('#edit-error-image').text('');
    if (document.getElementById('edit-image').value !== '') {
      if (file.size < 100000) {
        saveImage(file, idUser, urlBase);
        const url = `${urlBase}users/${idUser}`;
        fetch(`${urlBase}users/${idUser}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`,
          },
          body: JSON.stringify(objJson),
        })
          .then((resp) => resp.json())
          .then(() => {
            alert('User updated');
          });
      } else {
        $('#edit-error-image').text('Image size must be less than 100KB');
      }
    } else {
      fetch(`${urlBase}users/${idUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`,
        },
        body: JSON.stringify(objJson),
      })
        .then((resp) => resp.json())
        .then(() => {
          alert('User updated');
        });
    }
  }
}

function saveImage(input, id_user, urlBase) {
  let reader = new FileReader();
  reader.onloadend = () => {
    const url = `${urlBase}users/image/${id_user}`;
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

function registerUser(urlBase) {
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
          const url = `${urlBase}/users`;
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
      const url = `${urlBase}/users`;
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
}
export { editProfileSave, createJson, editProfileGetInfo, saveImage, registerUser };
