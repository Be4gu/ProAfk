function paintSlashDate(param) {
  const value = $(`#edit-${param}_date`).val();
  if (value > 0 && value < 13) {
    if (value.length === 2) {
      $(`#edit-${param}_date`).val(value + "/");
    }
  }
}

//Comprueba las fechas de entrada y salida
function validateDate(dateEntry, dateExit) {
  const valDateEntry = $(dateEntry).val().split("/");
  const valDateExit = $(dateExit).val().split("/");
  //Compara los años de la fecha de entrada y de salida.
  const year = new Date().getFullYear();
  if ($(dateEntry).val() === "") {
    return { error: "Entry date is required" };
  }
  if (valDateEntry[0] < 1 || valDateEntry[0] > 12) {
    return { error: `Icorrect month (01 - 12)` };
  }
  if (valDateEntry[1] < 2020 || valDateEntry[1] > year) {
    return { error: `Icorrect entry year (2020 - ${year})` };
  }
  if ($(dateExit).val() !== "") {
    if (valDateExit[0] < 1 || valDateExit[0] > 12) {
      return { error: `Icorrect month (01 - 12)` };
    }
    if (valDateExit[1] < 2020 || valDateExit[1] > year) {
      return { error: `Icorrect exit year (2020 - ${year})` };
    }
  }
  if (valDateEntry[1] > valDateExit[1]) {
    return { error: `La fecha de entrada debe ser menor` };
  }
  if (valDateEntry[1] === valDateExit[1]) {
    if (valDateEntry[0] > valDateExit[0]) {
      return { error: `La fecha de salida debe ser mayor` };
    }
  }
  return true;
}

function validateReuired(list) {
  let errors = [];
  if (list.name === "") errors.push({ name: "name", error: "Name is required!" });
  else if (!regexString(list.name)) errors.push({ name: "name", error: "Name format is incorrect!" });

  if (list.surname === "") errors.push({ name: "surname", error: "Surname is required!" });
  else if (!regexString(list.surname)) errors.push({ name: "surname", error: "Surname format is incorrect!" });

  if (list.contactEmail === "") errors.push({ name: "contactEmail", error: "Contact email is required!" });
  else if (!regexEmail(list.contactEmail)) errors.push({ name: "contactEmail", error: "Contact format is incorrect!" });

  if (list.nickName === "") errors.push({ name: "nickName", error: "Nickname is required!" });
  else if (!regexStringNumber(list.nickName)) errors.push({ name: "nickName", error: "Nickname format is incorrect!" });
  if (list.natalCountry === "") errors.push({ natalCountry: "Natal country is required!" });

  if (list.list_langues.length === 0) errors.push({ name: "langues", error: "Language is required!" });

  if (errors.length > 0) return errors;

  return true;
}

function regexString(input) {
  let regex = /^[a-zA-Z\s]+$/gm;
  return regex.test(input);
}
function regexStringNumber(input) {
  let regex = /^[a-zA-Z0-9]+$/gm;
  return regex.test(input);
}
function regexEmail(input) {
  let regex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gm;
  return regex.test(input);
}
export { validateDate, paintSlashDate, validateReuired };
