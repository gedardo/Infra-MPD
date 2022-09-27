"use strict";
module.exports = function(app) {
  //Entities Routes
  app.dynamic.entities.forEach(function(entity) {
    if (entity.enableRoute) {
      let auth = require("../auth/controller");

      //GET
      app
        .route("/v1/" + entity.name)
        .get(
          auth.verifySession,
          app.dynamic.controller.run
        );
      app
        .route("/v1/" + entity.name + "/:param1")
        .get(
          auth.verifySession,
          app.dynamic.controller.run
        );
      app
        .route("/v1/" + entity.name + "/:param1/:param2")
        .get(
          auth.verifySession,
          app.dynamic.controller.run
        );
      app
        .route("/v1/" + entity.name + "/:param1/:param2/:param3")
        .get(
          auth.verifySession,
          app.dynamic.controller.run
        );
      app
        .route("/v1/" + entity.name + "/:param1/:param2/:param3/:param4")
        .get(
          auth.verifySession,
          app.dynamic.controller.run
        );
      app
        .route(
          "/v1/" + entity.name + "/:param1/:param2/:param3/:param4/:param5"
        )
        .get(
          auth.verifySession,
          app.dynamic.controller.run
        );
      app
        .route(
          "/v1/" +
            entity.name +
            "/:param1/:param2/:param3/:param4/:param5/:param6"
        )
        .get(
          auth.verifySession,
          app.dynamic.controller.run
        );
      //POST
      app.route("/v1/" + entity.name).post(app.dynamic.controller.run);
      //PUT
      app
        .route("/v1/" + entity.name)
        .put(
          auth.verifySession,
          app.dynamic.controller.run
        );
      //DEL
      app
        .route("/v1/" + entity.name)
        .delete(
          auth.verifySession,
          app.dynamic.controller.run
        );
    }
  });
};
