// 1. Require Modules
const express = require("express");
const eventRoutes = require("./routes/eventRoutes");
const mainRoutes = require("./routes/mainRoutes");
const methodOVerride = require("method-override");

// 2. Create application
const app = express();

// 3. Configure
let port = 3000;
let host = "localhost";
app.set("view engine", "ejs");

// 4. Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOVerride("_method"));

// 5. Set-up routes
app.use("/", mainRoutes);

app.use("/events", eventRoutes);

app.use((req, res, next) => {
  let err = new Error("The server cannot locate " + req.url);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Error";
  }

  res.status(err.status);
  res.render("error", { error: err });
});

// 6. Start the server
app.listen(port, host, () => {
  console.log("The server is running on port ", port);
});
