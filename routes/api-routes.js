// importing in models and passport
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app)
{
  // &health=
  //dairy-free
  //gluten-free
  //peanut-free
  //soy-free
  //egg-free
  //shellfish-free
  //tree-nut-free

  //vegetarian
  //vegan
  //pecatarian
  //paleo


  //base url= https://api.edamam.com
  //getrequest= https://api.edamam.com/search
  //200 = sucess
  //404 = fail
  //“health=peanut-free&health=tree-nut-free”

  //example: https://api.edamam.com/search?q=chicken&app_id=$c2f36394&app_key=$be02844898830fb6498ff5c8b9928065&health=alcohol-free
  
  //https://api.edamam.com/search&app_id=$c2f36394&app_key=$be02844898830fb6498ff5c8b9928065&?q=chicken
  // Using the passport.authenticate middleware with our local strategy.
  // If the user logged in, send them to the members page.
  // else user will stay on nonmembers page
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    //members only access for the members page
    res.json("/members");
  });
  // sign up route for user. The password is encrypted through the Sequelize
  //User Model. If user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      username:req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      //tell user acct created
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.redirect(307, "/signup");
    });
  });

  // GET route for getting all of the favorites
  app.get("/api/saved", function(req, res) {
    var query = {};
    if (req.query.UserId) {

      query.UserId = req.query.id;
    }
    db.Save.findAll({
      where: query,
      order: [ ['updatedAt', 'DESC'] ]
    }).then(function(dbSaved) {
      res.json(dbSaved);
    });
  });

  // Get all specific user's saves
  app.get("/api/saved/:id", function(req, res) {
    db.Save.findAll({
      where: {
        UserId: req.params.id
      }
    })
    .then(function(dbSaved) {
      res.json(dbSaved);
    });
  });

  //add a save to user
  app.post("/api/save", function(req, res) {
    console.log(req.body);
    db.Save.create({
      recId:req.body.recId,
      recUrl: req.body.recUrl,
      recImg: req.body.recImg,
      recIngList: req.body.recIngList,
      recTitle: req.body.recTitle,
      recIngList: req.body.recIngList,
      UserId:req.body.UserId
    }).then(function()
    {
      //tell user acct created
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's username, email, and id
      res.json({
        username:req.user.username,
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // DELETE route for deleting specific recipe
  app.delete("/api/posts/:id", function(req, res) {
    console.log("delete: "+req.params)
    db.Save.destroy({
      where: {
        recId: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
