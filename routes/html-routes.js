// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app)
{
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user)
    {  res.redirect("/members");}
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  //
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user)
    {  res.redirect("/members");}
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user)
    {  res.redirect("/members");}
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  // uses isAuthenticated middleware to determine a member or not.
  // If a user who is not logged in tries to access this route they will not have acess to save favorites
  app.get("/members", isAuthenticated, function(req, res)
  {  res.sendFile(path.join(__dirname, "../public/members.html"));});
};
