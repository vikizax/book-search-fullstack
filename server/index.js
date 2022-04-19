const express = require("express");
const path = require("path");
const cors = require("cors");
const BookRouter = require("./router/book");
const app = express();
const port = 4000;

// Body parsing Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "build")));

// routes
app.use("/api/v1/book", BookRouter);
app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

try {
  app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
