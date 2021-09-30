const app = require("express")();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const routes = require("./src/routes/routes");
console.log(process.env.PORT);
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Method", "GET,POST,PUT,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.set("PORT", PORT);
app.use("/api", routes);

module.exports = app;
