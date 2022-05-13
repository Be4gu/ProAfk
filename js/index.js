let arr = [];
$("#edit-add-langues-btn").click(function () {
  const texto = $("#edit-langues option:selected").val();
  if (arr.length > 0) {
    let v;
    for (let i = 0; i < arr.length; i++) {
      if (arr.find((element) => element === texto)) {
        break;
      }
      if (i === arr.length - 1) {
        arr.push(texto);
        const p = document.createElement("p");
        const text = document.createTextNode(texto);
        p.appendChild(text);
        const c = document.getElementById("edit-add-langues");
        c.appendChild(p);
      }
    }
  } else {
    arr.push(texto);
    const p = document.createElement("p");
    const text = document.createTextNode(texto);
    p.appendChild(text);
    const c = document.getElementById("edit-add-langues");
    c.appendChild(p);
  }
});
