// Imports
require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const ejs = require("ejs");

// Intialize the app
const app = express();

// Fetching the models
const User = require("./db/models/users");
const Post = require("./db/models/post");
const Group = require("./db/models/group");
const Comment = require("./db/models/comment");

// Passport authentication
const passport = require("passport");
const localStrategy = require("passport-local"),
  methodOverride = require("method-override");
app.use(
  require("express-session")({
    // allows authenticated users access the app
    secret: "This is the decryption key",
    resave: false,
    saveUninitialized: false,
  })
);

// mongo url < Local / Remote >
const mongo_uri = process.env.MONGO_LOCAL;
const mongo_database = process.env.MONGO_REMOTE;

mongoose.connect(
  `${mongo_database}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err) => {
    if (err) console.log(err);
    else console.log("DB connected Successfully!");
  });

app.use(methodOverride("_method")); // method-override helps access app.delete() for log out
app.use(passport.initialize()); // used to initialize Passport, used to use passport for salt and hashing in our code
app.use(passport.session()); // for persistent login sessions

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

// Template engine
app.set("view engine", "ejs");

// For parsing application/json
app.use(bodyParser.json());

// Loading static files
app.use(express.static("public"));
app.use(express.static("views"));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

var authRoutes = require("./routes/auth.js");
var counter = 0;
app.use("/", authRoutes);

// Homepage rendering
app.get("/", function (req, res) {
  res.render("index", { currentUser: req.user });
});

// Opportunities page rendering
app.get("/opportunities", function (req, res) {
  Post.find({}, function (err, post) {
    res.render("opportunities", {
      currentUser: req.user,
      post: post,
    });
  });
});

app.post("/opportunities", function (req, res) {
  const post = new Post({
    title: req.body.Title,
    description: req.body.Description,
    eligibility: req.body.Eligibility,
    deadline: req.body.Deadline,
    link: req.body.Link,
  });

  post.save();
  res.redirect("/opportunities");
});

// Mentoring(help) page rendering
app.get("/help", function (req, res) {
  Group.find({}, function (err, group) {
    res.render("help", {
      currentUser: req.user,
      groups: group,
    });
  });
});

app.post("/help", function (req, res) {
  const group = new Group({
    title: req.body.Title,
    description: req.body.Description,
    link: req.body.Link,
    skills: req.user.skills,
    created_by: req.user.name,
  });
  Group.create(group, function (err, newlyCreated) {
    if (err) {
      console.log(err);
      res.redirect("/help");
    } else {
      res.redirect("/help");
    }
  });
});

app.get("/help/:id", function (req, res) {
  Group.findById(req.params.id)
    .populate("comments")
    .exec(function (err, found) {
      // Every model method that accepts query conditions can be executed by means of a callback or the exec method.
      if (err) {
        console.log(err);
      } else
        res.render("grouppage", {
          currentUser: req.user,
          group: found,
        });
    });
});

app.post("/help/:id", function (req, res) {
  Group.findById(req.params.id, function (err, found) {
    if (err) {
      console.log(err);
    }
    //create new comments
    else {
      Comment.create(req.body.comment, function (err, newComment) {
        if (err) {
          console.log(err);
          res.redirect("back"); // A back redirection redirects the request back to the referer, defaulting to / when the referer is missing.
        } else {
          newComment.author.id = req.user._id;
          newComment.author.username = req.user.name;
          newComment.author.mentor_status = req.user.is_mentor;
          newComment.is_answered = 0; //if its answered, then 1, else 0
          newComment.text = req.body.text;
          newComment.save();
          //add comment to group
          found.comments.push(newComment);
          //save comment
          found.save();
          //redirect to group show page
          res.redirect("/help/" + req.params.id);
        }
      });
    }
  });
});

// Groups page rendering
app.get("/grouppage", function (req, res) {
  res.render("grouppage", { currentUser: req.user });
});

app.post("/grouppage", function (req, res) {
  commentdbt = req.body.Commentans;
  is_answered = req.body.Answerstat;
  // console.log(is_answered);
});
//Displaying search result on searchresult.ejs page
app.post("/searchres",(req,res)=>
{ 
  Post.find({$text:{$search:req.body.searchString}},(err,foundres)=>
  {   
    if(err)
    {
      console.log(err);
     
    }
    else
    {
    res.render("searchresult",{foundpost:foundres});
    }
  }); 
});

// Tutorials page rendering
app.get("/tutorials", function (req, res) {
  res.render("tutorials", { currentUser: req.user });
});

// Teammates page rendering
var skillarr = [];
var requser = [];
app.get("/teammates", function (req, res) {
  res.render("teammates", {
    currentUser: req.user,
    requser: requser,
  });
});

//teammates posting
app.post("/teammates", function (req, res) {
  skillarr = [];
  requser = [];
  const currUser = req.user.name;
  if(JSON.stringify(req.body) === '{}'){
    res.redirect("/teammates");
  }else{
    if(typeof(req.body.checked) === "string"){
      skillarr[0] = req.body.checked;
    }else{
      for (var i = 0; i < req.body.checked.length; i++) {
        skillarr.push(req.body.checked[i]);
      }
    }
    for (var i = 0; i < skillarr.length; i++) {
      User.find({ skills: { $in: [skillarr[i]] } }, function (err, requserdb) {
        //  selects the documents where the value of a field equals any value in the specified array
        // console.log(requserdb);
        requserdb.forEach(function (user) {
          const userId = user._id.toString();
          const userName = user.name;
          const disId = user.discord_id;
          var isPresent = false;
          for(var j=0; j<requser.length; j++){
              const presentId = requser[j]._id.toString();
              const presentName = requser[j].name;
              const presentDisId = requser[j].discord_id;
              if(userId === presentId || (userName === presentName && disId === presentDisId)){
                isPresent = true;
                break;
              }
          }
          if(isPresent === false && currUser !== userName){
            requser.push(user)
          }
        });
      });
    }
    res.redirect("/teammates");
  }
});

// Profile page rendering
app.get("/profile", function (req, res) {
  res.render("profile", { currentUser: req.user });
});

// pride page rendering
app.get("/pride", function (req, res) {
  res.render("pride", { currentUser: req.user });
});

app.get("/logout", function(req, res) {
  requser = [];
  req.logout();
  res.redirect("/");
});

// Ports
var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Lazy bum on Port ${PORT}`);
});
