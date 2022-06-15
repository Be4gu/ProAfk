// import { paintSelect } from './controllers/paint_selects.js';
// import { filter, search } from './controllers/browser.js';
import { urlBase } from './controllers/url.js';
import { getToken } from './controllers/login.js';
import { paintModalMenu } from './controllers/paint_profile.js';

const url = window.location.href.split('=');
const id = url[1];
const idUser = getToken();
if (idUser) {
  paintModalMenu(urlBase, idUser);
}

fetch(`${urlBase}clubs/${id}`)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(data);
    $('#c-image').attr('src', data.photo);
    $('#c-name').text(data.name);
    painPlayers(data.player);
  });

function painPlayers(players) {
  players.forEach((ele) => {
    console.log(ele);
    $('#c-players').append(`<a href="profile.html?id=${ele.id}" class=" mx-4 h-20 flex items-center mt-2 sm:h-24  rounded-md">
    <div class="flex">
      <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white ml-2 overflow-hidden">
        <img src="${ele.image}" />
      </div>
      <div class="flex flex-col ">
        <div class="flex flex-col h-12 sm:h-16 justify-between ml-3">
          <div>${ele.nickName}</div>
          <div>${ele.name} ${ele.surname}</div>
          <div class="w-5 h-5">
    
            <div class="w-4 h-4 rounded-full ${ele.status ? 'bg-green-500' : 'bg-red-500'} sm:w-5 sm:h-5"></div>
          </div>
        </div>
      </div>
    </div>
    </a>`);
  });
}
