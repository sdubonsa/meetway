// 1. Require Modules
const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const eventRoutes = require("./routes/eventRoutes");
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require('./routes/userRoutes');
const { fileUpload } = require("./middleware/fileUpload");
const methodOVerride = require("method-override");

// 2. Create application
const app = express();

// 3. Configure
let port = 3000;
let host = "localhost";
let url =
  "mongodb+srv://santiagodubon:hcwmY58Mkmfm3JMP@cluster0.bt6ih5y.mongodb.net/nbda-project3";
app.set("view engine", "ejs");

// connect to mongodb
mongoose
  .connect(url)
  .then(() => {
    //start the server
    app.listen(port, host, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((err) => console.log(err));

// 4. Middleware

//mount middlware
app.use(
  session({
    secret: "ajfeirf90aeu9eroejfoefj",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: "mongodb+srv://santiagodubon:hcwmY58Mkmfm3JMP@cluster0.bt6ih5y.mongodb.net/nbda-project3" }),
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user || null;
    res.locals.name = req.session.name || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOVerride("_method"));

// 5. Set-up routes
app.use("/", mainRoutes);

app.use("/events", eventRoutes);

app.use("/users", userRoutes);

app.use((req, res, next) => {
  let err = new Error("The server cannot locate " + req.url);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Error";
    console.log(err);
  }

  res.status(err.status);
  res.render("error", { error: err });
});