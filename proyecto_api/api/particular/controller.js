"use strict";

module.exports = {
  run: function (req, res) {
    req.app.response = res;
    req.app.reflect.model.table = req.app.reflect.entities.find(
      (entity) => entity.name == req.url.split("/")[2].split("?")[0]
    ).table;
    switch (req.method) {
      case "GET":
        req.app.reflect.model.getByParameters(req, function (data) {
          req.app.response.status(200).json(data);
        });
        break;
      case "POST":
        req.app.reflect.model.add(req, function (data) {
          req.app.response.status(200).json(data);
        });
        break;
      case "PUT":
        req.app.reflect.model.update(req, function (data) {
          req.app.response.status(200).json(data);
        });
        break;
      case "DELETE":
        req.app.reflect.model.delete(req, function (data) {
          req.app.response.status(200).json(data);
        });
        break;
    }
  },

  getTarea_tipo_oficina_inmueble_usuario_cliente: function (req, res) {
    let model = require("./model");
    req.app.response = res;
    model.getTarea_tipo_oficina_inmueble_usuario_cliente(req, function (data) {
      req.app.response.status(200).json(data);
    });
  },
};
