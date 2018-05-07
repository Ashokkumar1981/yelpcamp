var express = require("express");
var router  = express.Router();
var campground =require("../models/campground");
var user = require("../models/user");
var passport = require("passport");

//==========================================================

router.get("/",function(req,res){
    res.render("landing");
    
});


//===============================
// AUTH ROUTES
//===============================
router.get("/register",function(req,res){
    res.render("register"); 
});

router.post("/register",function(req,res){
        
    user.register(new user({username:req.body.username}),req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        else
        {
            req.flash("success", "Welcome to Yelpcamp" + user.username);
            
            passport.authenticate("local")(req,res,function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

// ==========================
// SHOW LOGIN FORM
// ==========================
router.get("/login",function(req,res){
    res.render("login");
});

// Login logic
// Middleware - Some code runs before our final route call back here. It sits between beginning and end of the route.
// app.post(ROUTE,MIDDLEWARE,CALLBACK)
router.post("/login", passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
    }),function(req,res){
    
});

// ===============
// Logout route
// ===============

router.get("/logout",function(req,res){
    
    req.logout(); // passport destroys all the user data in the session
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
});



module.exports = router;