var express = require("express"),
  app = express(),
  cors = require("cors"),
  port = process.env.PORT || 3000,
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.disable("etag");
app.jwt = require("jsonwebtoken");

// - Load Components
app.db = require("./db/connection");
app.helpers = {
  error: require("./helpers/error_helper"),
  file: require("./helpers/file_helper"),
  dateFormat: require("dateformat")
};

app.bcrypt = require("bcrypt");

// - Load dynamic Module
app.dynamic = {
  entities: require("./api/dynamic/entities"),
  model: require("./api/dynamic/model"),
  controller: require("./api/dynamic/controller"),
  query: require("./api/dynamic/query"),
  format: require("./api/dynamic/format"),
  trigger: require("./api/dynamic/trigger"),
  validate: require("./api/dynamic/validate"),
  error: require("./api/dynamic/error"),
  particular: require("./api/particular/controller"),
  auth: require("./api/auth/controller")
};

// - Load Routes
var auth_routes = require("./api/auth/routes");
var dynamic_routes = require("./api/dynamic/routes");
var particular_routes = require("./api/particular/routes");
dynamic_routes(app);
particular_routes(app);
auth_routes(app);

// - Init API
app.listen(port);
console.log("API Server - Started - Port: " + port);

// - Errors
process.on("uncaughtException", function(err) {
  console.log(err);
});

process.on("exit", function(err) {
  console.log(err);
});
