const app = require("express")();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const routes = require("./src/routes/routes");
console.log(process.env.PORT);
app.set("PORT", PORT);
app.use("/api", routes);

module.exports = app;
