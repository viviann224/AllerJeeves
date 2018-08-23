$(document).ready(function()
{
  $(".logoutBtn").on("click", function(event)
  {
    event.preventDefault();
    $.get("/logout", function(res)
    {  return res;});
  });

  function logOut()
  {
    $.get("/logout", function(res)
    {  return res;});
  }
});
