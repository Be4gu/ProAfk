//Importa las funciones
import { paintSelect, addRoleLang, deleteRoleLang, paintRoleLang, addClub } from "./controllers/paint_selects.js";
import { validateDate, paintSlashDate, validateReuired } from "./controllers/validation.js";
//Impoorta las variables
import { list_langues, list_roles, clubs } from "./controllers/paint_selects.js";

paintSelect("languages", "langues");
paintSelect("countries", "natal_country");
paintSelect("countries", "resident_country");
paintSelect("roles", "roles");
paintSelect("clubs", "clubs");

fetch("http://localhost:3001/api/users/62962920301744dbfdaa3f02")
  .then((resp) => resp.json())
  .then(function (data) {
    $("#edit-name").val(data.name);
    $("#edit-nickName").val(data.nickName);
    $("#edit-contactEmail").val(data.email);
    $("#edit-surname").val(data.surname);
    $("#edit-twitter").val(data.linkTwitter);
    $("#edit-vlr").val(data.linkVlr);
    $("#edit-twitch").val(data.linkTwitch);
    data.language.forEach((ele) => {
      list_langues.push(ele.name);
    });
    paintRoleLang("langues", list_langues);
    data.role.forEach((ele) => {
      list_roles.push(ele.name);
    });
    paintRoleLang("roles", list_roles);
    let cad;
    data.clubs.forEach((ele) => {
      cad = ele.idClub.name + " - " + ele.entryDate + " - " + ele.exitDate;
      clubs.push(cad);
    });
    paintRoleLang("clubs", clubs);
    paintSelect("countries", "natal_country", "Spain"); //Añadir los paises
  });

//Events buttons edit page
$("#edit-add-clubs-btn").click(function () {
  const flag = validateDate("#edit-start_date", "#edit-end_date");
  if (flag === true) {
    $("#edit-errors_club").text("");
    addClub();
  } else {
    $("#edit-errors_club").text(flag.error);
  }
});
$("#edit-add-langues-btn").click(function () {
  addRoleLang("langues");
});
$("#edit-add-roles-btn").click(function () {
  addRoleLang("roles");
});
$("#edit-delete-roles-btn").click(function () {
  deleteRoleLang("roles");
});
$("#edit-delete-clubs-btn").click(function () {
  deleteRoleLang("clubs");
});
$("#edit-delete-langues-btn").click(function () {
  deleteRoleLang("langues");
});
$("#edit-start_date").keyup(function () {
  paintSlashDate("start");
});
$("#edit-end_date").keyup(function () {
  paintSlashDate("end");
});

$("#edit-save").click(function createJson() {
  const name = $("#edit-name").val().trim();
  const surname = $("#edit-surname").val().trim();
  const contactEmail = $("#edit-contactEmail").val().trim();
  const nickName = $("#edit-nickName").val().trim();
  const natalCountry = $("#edit-natal_country option:selected").val();
  const residentCountry = $("#edit-resident_country option:selected").val();
  const linkTwitter = $("#edit-twitter").val().trim();
  const linkVlr = $("#edit-twitch").val().trim();
  const linkTwitch = $("#edit-vlr").val().trim();
  let list_clubs = [];
  clubs.forEach((ele) => {
    const c = ele.split(" - ");
    list_clubs.push({
      name: c[0],
      dateEntry: c[1],
      dateExit: c[2],
    });
  });
  console.log(list_roles);
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
  // console.log(objJson);
  const errors = validateReuired(objJson);
  if (errors !== true) {
    errors.forEach((ele) => {
      $(`#edit-error-${ele.name}`).text(ele.error);
    });
  } else {
    // saveImage();
    const file = $("#edit-image").prop("files")[0];
    // if (file.size < 100000 || file === "") {
    // saveImage(file, "6299ecc318aa2bbf1be4b366");
    const url = `http://localhost:3001/api/users/62962920301744dbfdaa3f02`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: reader.result }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
  };
  reader.readAsDataURL(input);
}
