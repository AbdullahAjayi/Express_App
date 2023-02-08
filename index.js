const express = require("express");
const logger = require("./middleware/logger");
const path = require("node:path");

const app = express();

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Init Middleware
// app.use(logger);

// Set a static folder
app.use(express.static(`./public`));

// Memebers Api Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
