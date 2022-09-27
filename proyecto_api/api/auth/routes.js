'use strict';

module.exports = function(app) {
  //Auth Routes
  var authController = require('../auth/controller');
  app.route('/auth/login')
      .post(authController.login);
  app.route('/auth/user')
      .get(authController.getUser);
  app.route('/auth/logout')
      .post(authController.logout);
  app.route('/auth/change-password')
      .put(authController.verifySession, authController.changePassword);
  app.route("/auth/newUser")
      .post(authController.newUser);
  app.route("/auth/requestPasswordReset")
      .post(authController.requestPasswordReset);
}