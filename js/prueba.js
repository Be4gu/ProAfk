import { tryLogin } from "./controllers/login.js";
import { userAndPassword } from "./controllers/validation.js";

$("#index-login").click(function () {
  const user = $("#index-email_login").val().trim();
  const pass = $("#index-password").val().trim();
  const flag = userAndPassword(user, pass);
  console.log(flag);
  if (flag !== true) {
    $("#login-error").empty();
    console.log("entra");
    flag.forEach((ele) => {
      $("#login-error").append(`<p>${ele.error} <p>`);
    });
  } else if (flag === true) tryLogin(user, pass);
});
