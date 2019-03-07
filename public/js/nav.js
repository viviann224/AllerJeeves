// SIDEBAR
$(document).ready(function()
{

  $('.button-collapse').sideNav(
  {
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  });

  // START OPEN
  $('.button-collapse').sideNav('show');
  //Top Navbar
  $(".dropdown-content").dropdown({ hover: true, constrainWidth: false });

  //enable modals to run
  $('.modal-trigger').leanModal();

  // //when user clicks on about, open the about modal
   $("#about").click(function()
   {  $("#aboutModal").openModal();});
   
   // //when user clicks login close current modal then open login modal
    $("#close").click(function()
    { $(".lean-overlay").hide();});

});
