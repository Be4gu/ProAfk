const urlBase = 'http://localhost:3001';
export let list_langues = [];
export let list_roles = [];
export let clubs = [];

//Añade todas las opciones para los select de EDIT 'los trae de la API'
function paintSelect(end_url, select, selecteds) {
  fetch(`${urlBase}/api/${end_url}`)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((ele) => {
        if (ele.name === selecteds) {
          $(`#edit-${select}`).append($('<option selected="selected"></option>').val(ele.id).html(ele.name));
        } else {
          $(`#edit-${select}`).append(
            $('<option>', {
              value: ele.id,
              text: ele.name,
            })
          );
        }
      });
    });
}

//Añade un rol/idioma en funcion de lo que el usuario seleccione
function addRoleLang(role_lang) {
  const lang_val = $('#edit-' + role_lang + ' option:selected').val();
  const lang_text = $('#edit-' + role_lang + ' option:selected').text();
  if (role_lang === 'langues') {
    if (list_langues.find((ele) => ele.id === lang_val) == undefined) {
      list_langues.push({ name: lang_text, id: lang_val });
      paintRoleLang(role_lang, list_langues);
    }
  } else if (role_lang === 'roles') {
    if (list_roles.find((ele) => ele.id === lang_val) == undefined) {
      list_roles.push({ name: lang_text, id: lang_val });
      paintRoleLang(role_lang, list_roles);
    }
  }
}
//Añade un club a la lista de clubs
function addClub() {
  const dateEntry = $('#edit-start_date').val();
  const dateEnd = $('#edit-end_date').val();
  const nameClub = $('#edit-clubs option:selected').text();
  const idClub = $('#edit-clubs option:selected').val();
  const clubString = `${nameClub} - ${dateEntry} - ${dateEnd}`;
  if (clubs.find((ele) => ele.name === clubString) == undefined) {
    clubs.push({ name: clubString, id: idClub });
    paintRoleLang('clubs', clubs);
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

  if (role_lang === 'langues') {
    let aux = list_langues;
    langues_checked.forEach((ele) => {
      aux = aux.filter((elem) => ele !== elem.id);
    });
    list_langues = aux;
    paintRoleLang(role_lang, list_langues);
  } else if (role_lang === 'roles') {
    let aux = list_roles;
    langues_checked.forEach((ele) => {
      aux = aux.filter((elem) => ele !== elem.id);
    });
    list_roles = aux;
    paintRoleLang(role_lang, list_roles);
  } else if (role_lang === 'clubs') {
    let aux = clubs;
    langues_checked.forEach((ele) => {
      aux = aux.filter((elem) => ele !== elem.id);
    });
    clubs = aux;
    paintRoleLang(role_lang, clubs);
  }
}

//Pinta los roles e idiomas en funcion de lo que ya tiene en la base de datos
function paintRoleLang(role_lang, elements) {
  const c = document.getElementById('edit-add-' + role_lang);
  c.innerHTML = '';
  for (let i = 0; i < elements.length; i++) {
    const div = document.createElement('div');
    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', `${role_lang}` + i);
    newLabel.classList.add('mr-2', 'cursor-pointer');
    newLabel.innerHTML = elements[i].name;

    const newCheckbox = document.createElement('input');
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.setAttribute('id', `${role_lang}` + i);
    newCheckbox.setAttribute('name', `${role_lang}`);
    newCheckbox.setAttribute('value', elements[i].id);
    newCheckbox.classList.add('w-5', 'h-5', 'text-lpurple', 'cursor-pointer', 'bg-gray-100', 'rounded-full', 'border-gray-300', 'focus:ring-transparent');
    div.classList.add('flex', 'gap-2', 'items-center');
    div.appendChild(newCheckbox);
    div.appendChild(newLabel);
    c.appendChild(div);
  }
}

export { paintSelect, addRoleLang, paintRoleLang, deleteRoleLang, addClub };
