

// SIDEBAR
$(document).ready(function()
{
  $('.button-collapse').sideNav(
    {
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
  // START OPEN
  $('.button-collapse').sideNav('show');

  //Top Navbar
  $(".dropdown-content").dropdown({ hover: true, constrainWidth: false });

  //top button
  $(".fixed-action-btn").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
  });

  // //enable modals to run
  // $('.modal-trigger').leanModal();
  //
  // //when user clicks login close current modal then open login modal
  //  $("#clickLogin").click(function()
  //  {
  //    $("#signupModal").closeModal();
  //    $("#loginModal").openModal();
  //  });
  //
  //  //when user clicks login close current modal then open login modal
  //   $("#clickSignup").click(function()
  //   {
  //     $("#loginModal").closeModal();
  //     $("#signupModal").openModal();
  //
  //   });
  //
  //   //char counter
  //   $('input#icon_prefix, textarea#textarea1').characterCounter();
  //

});
