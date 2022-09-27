"use strict";
module.exports = function (app) {
  let auth = require("../auth/controller");

  //Particular Routes
  app
    .route("/particular/tareas")
    .get(
      auth.verifySession,
      app.dynamic.particular.getTarea_tipo_oficina_inmueble_usuario_cliente
    );
};
