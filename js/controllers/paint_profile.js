function user(id, urlBase) {
  fetch(`${urlBase}users/${id}`)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
      $('#pp-name').text(data.name);
      $('#pp-nickName').text(data.nickName);
      $('#pp-contactEmail').text(data.email);
      $('#pp-surname').text(data.surname);
      $('#pp-natalCountry').text(data.natalCountry.name);
      $('#pp-residentCountry').text(data.resCountry.name);
      $('#pp-image').attr('src', data.image);
      paintLanguesAndRoles(data.language, '#pp-langues');
      paintLanguesAndRoles(data.role, '#pp-role');
      paintClubsEdit(data.clubs);
      $('#pp-twitter').attr('href', data.linkTwitter);
      $('#pp-twitch').attr('href', data.linkTwitch);
      $('#pp-vlr').attr('href', data.linkVlr);

      $('#pp-avatar').attr('src', data.image);
      $('#pp-menu-name').text(data.name);
      $('#pp-menu-email').text(data.email);
    });
}
function paintModalMenu(urlBase, id) {
  fetch(`${urlBase}users/${id}`)
    .then((resp) => resp.json())
    .then(function (data) {
      $('#pp-avatar').attr('src', data.image);
      $('#pp-menu-name').text(data.name);
      $('#pp-menu-email').text(data.email);
    });
}
function paintLanguesAndRoles(lan_rol, type) {
  if (lan_rol.length > 0) {
    lan_rol.forEach((ele) => {
      $(`${type}`).append(`<li>${ele.name}<li>`);
    });
  }
}
function paintClubs(clubs) {
  clubs.forEach((ele) => {
    $('#p-clubs').append(`<div class="box_club w-full  border-t-2  rounded-lg my-3">
    <div class="w-full flex items-center p-2">
      <img src="${ele.idClub.photo}" class="w-14 h-14" alt="Logo G2" />
      <div class="ml-5">
        <div>${ele.idClub.name}</div>
        <div>${ele.entryDate} - ${ele.exitDate}</div>
      </div>
    </div>
  </div>`);
    $('#prueba').addClass('border-cyan-400');
  });
}
function paintClubsEdit(clubs) {
  clubs.forEach((ele) => {
    $('#pp-clubs').append(`<div class="bg-white/[.2] flex gap-3 p-2 rounded-md mt-2" >
       <div>${ele.idClub.name}: ${ele.entryDate} - ${ele.exitDate}</div>     
    </div>`);
  });
}
export { user, paintModalMenu, paintLanguesAndRoles, paintClubsEdit, paintClubs };
