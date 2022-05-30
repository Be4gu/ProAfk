let list_langues = [];
let list_roles = [];

fetch("http://localhost:3001/api/users/629360cc3443b4b4f6aada27")
  .then((resp) => resp.json())
  .then(function (data) {
    list_langues = data.language;
    paintRoleLang("langues", list_langues);
    data.role.forEach((ele) => {
      list_roles.push(ele.name);
    });
    paintRoleLang("roles", list_roles);
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
$("#edit-delete-langues-btn").click(function () {
  deleteRoleLang("langues");
});

//Añade un rol/idioma en funcion de lo que el usuario seleccione
function addRoleLang(role_lang) {
  const lang_val = $("#edit-" + role_lang + " option:selected").val();
  if (role_lang === "langues") {
    if (list_langues.find((ele) => ele === lang_val) == undefined) {
      list_langues.push(lang_val);
      paintRoleLang(role_lang, list_langues);
    }
  } else if (role_lang === "roles") {
    if (list_roles.find((ele) => ele === lang_val) == undefined) {
      list_roles.push(lang_val);
      paintRoleLang(role_lang, list_roles);
    }
  }
}

//Elimina un rol/idioma por si el usuario quiere modificar alguno
function deleteRoleLang(role_lang) {
  const checked = document.getElementsByName(role_lang);
  const langues_checked = [];
  checked.forEach((element) => {
    if (element.checked === true) {
      langues_checked.push(element.value);
    }
  });
  if (role_lang === "langues") {
    const elementos_filtred = list_langues.filter(function (obj) {
      return langues_checked.indexOf(obj) === -1;
    });
    list_langues = elementos_filtred;
    paintRoleLang(role_lang, list_langues);
  } else if (role_lang === "roles") {
    const elementos_filtred = list_roles.filter(function (obj) {
      return langues_checked.indexOf(obj) === -1;
    });
    list_roles = elementos_filtred;
    paintRoleLang(role_lang, list_roles);
  }
}
//Pinta los roles e idiomas en funcion de lo que ya tiene en la base de datos
function paintRoleLang(role_lang, elements) {
  const c = document.getElementById("edit-add-" + role_lang);
  c.innerHTML = "";
  for (let i = 0; i < elements.length; i++) {
    const div = document.createElement("div");
    const newLabel = document.createElement("label");
    newLabel.setAttribute("for", `${role_lang}` + i);
    newLabel.classList.add("mr-2");
    newLabel.innerHTML = elements[i];

    const newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("id", `${role_lang}` + i);
    newCheckbox.setAttribute("name", `${role_lang}`);
    newCheckbox.setAttribute("value", elements[i]);
    newCheckbox.classList.add("w-5", "h-5", "text-lpurple", "bg-gray-100", "rounded-full", "border-gray-300", "focus:ring-transparent");
    div.classList.add("flex", "gap-2", "items-center");
    div.appendChild(newCheckbox);
    div.appendChild(newLabel);
    c.appendChild(div);
  }
}
