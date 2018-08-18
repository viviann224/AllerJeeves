$(document).ready(function()
{

  //enable modals to run
  //turningoff modal
  //$('.modal-trigger').leanModal();

  // //when user clicks login close current modal then open login modal
  //  $("#clickLogin").click(function()
  //  {
  //
  //    $("#signupModal").closeModal();
  //    $("#loginModal").openModal();
  //  });

   //when user clicks login button
    $("form.login").submit(function(event)
    {

      event.preventDefault();
      var loginForm = $("form.login");
      var emailInput= $("input#email-input").val().trim();
      var passwordInput= $("input#password-input").val().trim();

      // console.log(emailInput);
      // console.log(passwordInput);

        var userData = {
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
        function loginUser(email, password) {
          $.post("/api/login", {
            email: email,
            password: password
          }).then(function(data) {
            window.location.replace(data);
            // If there's an error, log the error

          }).catch(function(err) {
            $("form.login").append("<p class='errorMsg'>Invalid login. Please try again<p>");
            //console.log(err);

          });
        }







   //when user clicks login close current modal then open login modal
    $("#clickSignup").click(function()
    {
      $("#loginModal").closeModal();
      $("#signupModal").openModal();

    });

    $(".signupBtn").click(function()
    {
      // prevent page refresh when submit is pressed
      event.preventDefault();
      $(location).attr('href',"/signup");

    });

    //char counter
    //turning off
    //$('input#icon_prefix, textarea#textarea1').characterCounter();


  // // Getting references to our form and inputs
  // var loginForm = $("form.login");
  // var emailInput = $("input#email-input");
  // var passwordInput = $("input#password-input");
  //
  // // When the form is submitted, we validate there's an email and password entered
  // loginForm.on("submit", function(event) {
  //   event.preventDefault();
  //   var userData = {
  //     email: emailInput.val().trim(),
  //     password: passwordInput.val().trim()
  //   };
  //
  //   if (!userData.email || !userData.password) {
  //     return;
  //   }
  //
  //   // If we have an email and password we run the loginUser function and clear the form
  //   loginUser(userData.email, userData.password);
  //   emailInput.val("");
  //   passwordInput.val("");
  // });
  //
  // // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  // function loginUser(email, password) {
  //   $.post("/api/login", {
  //     email: email,
  //     password: password
  //   }).then(function(data) {
  //     window.location.replace(data);
  //     // If there's an error, log the error
  //   }).catch(function(err) {
  //     console.log(err);
  //   });
  // }

});
