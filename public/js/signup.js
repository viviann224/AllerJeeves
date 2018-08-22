$(document).ready(function()
{
   // When the signup button is clicked, we validate the email and password are not blank
   $("form.signup").submit(function(event)
   {
      event.preventDefault();
      // Getting references to our form and input
      var signUpForm = $("form.signup");
      var userInput =$("input#newusername-input").val().trim();
      var emailInput = $("input#newemail-input").val().trim();
      var passwordInput = $("input#newpassword-input").val().trim();

     var userData =
     {
       username:userInput,
       email: emailInput,
       password: passwordInput
     };

       if (!userData.email || !userData.password) {
         return;
       }
         // If we have an email and password, run the signUpUser function
         signUpUser(userData.username, userData.email, userData.password);
       });

   // Does a post to the signup route. If succesful, we are redirected to the members page
   // Otherwise we log any errors
   function signUpUser(username,email, password) {
     $.post("/api/signup", {
       username:username,
       email: email,
       password: password
     }).then(function(data) {

       window.location.replace(data);

       // If there's an error, handle it by throwing up a boostrap alert
     }).catch(function(err) {
       $("form.signup").append("<p class='errorMsg'>Invalid email. Please try again<p>");
       $("input#newusername-input").val("");
       $("input#newemail-input").val("");
       $("input#newpassword-input").val("");
     });
   }
});
