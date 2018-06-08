

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
  //login / logout modal
  $(document).ready(function(){
   // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
   $('.modal-trigger').leanModal();
 });

});
