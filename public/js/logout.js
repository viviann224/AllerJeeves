

$(document).ready(function()
{
  $(".logoutBtn").on("click", function(event)
  {
    event.preventDefault();
    //alert("logging out");
    $.get("/logout", function(res)
    {
      alert("logging out");
      return res;
    });

  });

  function logOut()
  {
    $.get("/logout", function(res)
    {
      alert("logging out");
      return res;
    });
  }
});
