// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res)
  {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    db.Post.findAll({
      where: query
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  // Get all specific user's saves
  app.get("/api/saved/id/:recId", function(req, res) {
    db.Save.findAll({
      where: {
        //UserId: req.params.id,
        recId: req.params.recId
      }
    })
    .then(function(dbSaved) {
      res.json(dbSaved);
    });
  });

  // // DELETE route for deleting posts
  // app.delete("/api/posts/:recId", function(req, res) {
  //   db.Save.destroy({
  //     where: {
  //       recId: req.params.recId
  //     }
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  };
