import { urlBase } from './url.js';

function login(email, pass) {
  fetch(`${urlBase}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: pass }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        $('#login-error').text(data.error);
      } else {
        window.localStorage.setItem('log', JSON.stringify(data));
        window.location.replace('src/pages/main.html');
      }
    })
    .catch((error) => {
      console.log('Error:' + error);
    });
}

function getToken() {
  const log = JSON.parse(window.localStorage.getItem('log'));
  if (log) {
    return log.id;
  }
  return null;
}

function isLoged() {
  if (!window.localStorage.log) {
    window.location.replace('../../index.html');
  } else {
    $('#spinner').addClass('hidden');
    $('#body').removeClass('hidden');
  }
}

export { login, getToken, isLoged };
