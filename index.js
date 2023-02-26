const express = require("express");
const logger = require("./middleware/logger");
const { engine } = require("express-handlebars");
const path = require("node:path");
const { members } = require("./members");

const app = express();

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Init Middleware
// app.use(logger);

// Handlebars Middleware
app.engine("handlebars", engine({}));
app.set("view engine", "handlebars");
app.set("views", "./views");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Member App",
    members,
  });
});
// Set a static folder
app.use(express.static(`./public`));

// Memebers Api Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
