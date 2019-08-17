require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "../public")));

app.use(require("./routes"));

mongoose
  .connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Base de datos ONLINE"))
  .catch(error => console.log("Error:", error));

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
});
