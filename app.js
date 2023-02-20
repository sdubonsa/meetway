// 1. Require Modules
const express = require("express");
const eventRoutes = require("./routes/eventRoutes");

// 2. Create application
const app = express();

// 3. Configure
let port = 3000;
let host = "localhost";
app.set("view engine", "ejs");

// 4. Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// 5. Set-up routes
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/events", eventRoutes);


// 6. Start the server
app.listen(port, host, () => {
  console.log("The server is running on port ", port);
});
