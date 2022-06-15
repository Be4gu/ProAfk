import { paintSelect } from './controllers/paint_selects.js';

paintSelect('languages', 'langues');
paintSelect('countries', 'natal_country');
paintSelect('countries', 'resident_country');
const log = JSON.parse(window.localStorage.getItem('log'));
const idUser = log.id;
console.log(idUser);
// user(idUser);
fetch(`http://localhost:3001/api/users/${idUser}`)
  .then((resp) => resp.json())
  .then(function (data) {
    $('#pp-avatar').attr('src', data.image);
    $('#pp-menu-name').text(data.name);
    $('#pp-menu-email').text(data.email);
  });
$('#filter-search').click(function () {
  let array = [];
  const roles = document.getElementsByName('roles');
  roles.forEach((ele) => {
    if (ele.checked === true) array.push({ role: ele.value });
  });
  if ($('#edit-natal_country option:selected').val() !== '') array.push({ natalCountry: $('#edit-natal_country option:selected').val() });
  if ($('#edit-resident_country option:selected').val() !== '') array.push({ resCountry: $('#edit-resident_country option:selected').val() });
  if ($('#edit-langues option:selected').val() !== '') array.push({ language: $('#edit-langues option:selected').val() });
  if ($('#filter-inncative').is(':checked') === true) array.push({ innactive: true });

  if (array.length > 0) {
    fetch(`http://localhost:3001/api/users/pruebaaaa/${JSON.stringify(array)}`, {
      method: 'GET',
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        $('#result-filter').empty();
        data.forEach((ele) => {
          $('#result-filter').append(`
        <a href="profile.html?user=${ele.id}" class="bg-white/[.1] w-full h-16 flex items-center mt-2 sm:h-24 border-t-2 justify-between border-lcyan rounded-md">
          <div class="flex">
            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white ml-2 overflow-hidden">
              <img src="${ele.image}" />
            </div>
            <div class="flex flex-col">
              <div class="flex flex-col h-12 sm:h-16 justify-between ml-3">
                <div>${ele.nickName}</div>
                <div class="w-4 h-4 rounded-full bg-red-500 sm:w-5 sm:h-5"></div>
              </div>
            </div>
          </div>
          <div class="flex flex-col mr-5">
            <div class="flex flex-col h-12 sm:h-16 justify-between ml-3">
              <div>Date1</div>
              <div>ALGO</div>
            </div>
          </div>
        </a>`);
        });
      });
  }
});

$('#main-search').keyup(function () {
  const val = document.getElementById('main-search').value.trim();
  if (val !== '') {
    fetch(`http://localhost:3001/api/users/pruebaaaa2/${JSON.stringify(val)}`, {
      method: 'GET',
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        $('#result-filter').empty();
        data.forEach((ele) => {
          let url;
          if (!ele.nickName) url = 'club';
          else url = 'profile';

          ele.nickName === undefined ? ele.name : ele.nickName;
          $('#result-filter').append(`
        <a href="${url}.html?id=${ele.id}" class="bg-white/[.1] w-full h-16 flex items-center mt-2 sm:h-24 border-t-2 justify-between border-lcyan rounded-md">
          <div class="flex">
            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white ml-2 overflow-hidden">
              <img src="${ele.image === undefined ? ele.photo : ele.image}" />
            </div>
            <div class="flex flex-col">
              <div class="flex flex-col h-12 sm:h-16 justify-between ml-3">
                <div> <span class="italic font-bold">${ele.nickName === undefined ? ele.name : ele.nickName}</span></div>
                <div class="w-4 h-4 rounded-full bg-red-500 sm:w-5 sm:h-5"></div>
              </div>
            </div>
          </div>
          <div class="flex flex-col mr-5">
            <div class="flex flex-col h-12 sm:h-16 justify-between ml-3">
              <div>Date1</div>
              <div>ALGO</div>
            </div>
          </div>
        </a>`);
        });
      });
  }
});
