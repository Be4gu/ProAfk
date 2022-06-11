export function tryLogin(email, pass) {
  fetch("http://localhost:3001/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: pass }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        $("#login-error").text(data.error);
      } else {
        window.localStorage.setItem("log", JSON.stringify(data));
        window.location.replace("src/pages/personal_profile.html");
      }
    })
    .catch((error) => {
      console.log("Error:" + error);
    });
}
