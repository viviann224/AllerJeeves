$(document).ready(function()
{ //when user clicks login button
  $("form.login").submit(function(event)
  {
    event.preventDefault();
    var loginForm = $("form.login");
    var emailInput= $("input#email-input").val().trim();
    var passwordInput= $("input#password-input").val().trim();

    var userData =
    {
      email: emailInput,
      password: passwordInput
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    $("#email-input").val("");
    $("#password-input").val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password)
  {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      $("form.login").append("<p class='errorMsg'>Invalid login. Please try again<p>");
    });
  }

  $(".signupBtn").click(function()
  {// prevent page refresh when submit is pressed
    event.preventDefault();
    $(location).attr('href',"/signup");
  });
});
