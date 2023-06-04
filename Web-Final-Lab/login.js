$(function () {
  $("#myForm").submit(function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log(formData);

    var usernameValue = $('#name').val();
    var passwordValue = $('#password').val();

    console.log(usernameValue,passwordValue)

    $.ajax({
        type: "POST",
        url: "https://dummyjson.com/auth/login",
        headers: { 'Content-Type': 'application/json' },
        data:  JSON.stringify({
            username: usernameValue,
            password: passwordValue,
          }),
        success: function (response) {
        console.log(response.token)

        localStorage.setItem("Token_id",response.token)

        console.log(localStorage.getItem("Token_id"))

        }
    });
  });
});
