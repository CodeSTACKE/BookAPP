var db = require("../models");
// =============================================================
var path = require("path");

//loads the login page
module.exports = function(app) {
 
  app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login",function(req,res){
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //loads the register page
  app.get("/register",function(req,res){
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });
  app.get("/addbooks",function(req,res){
   
   
    res.sendFile(path.join(__dirname, "../public/addbooks.html"));
  });
 
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      // res.render("index", {
      //   msg: "Welcome!",
      //   examples: dbExamples
      // });
    });
  });
  

  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample){
  //   });
  // });

  app.get("/welcome", function (req, res) {
    // console.log("here's some stuff about the user:", req.user.firstname + " " + req.user.lastname+ " Role"+req.user.role);
    res.sendFile(path.join(__dirname, "../public/display.html"));
  });
  app.get("/admin", function (req, res) {
    // console.log("here's some stuff about the user:", req.user.firstname + " " + req.user.lastname+ " Role"+req.user.role);
    res.sendFile(path.join(__dirname, "../public/Admin.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    // res.render("404");
  });
};
