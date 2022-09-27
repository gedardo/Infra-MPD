"use strict";

module.exports = {
  auth_model: require("./model"),
  login: function(req, res) {
    module.exports.auth_model.newSession(req, function(result) {
      res.json(result);
    });
  },
  getUser: function(req, res) {
    module.exports.auth_model.verifySession(req, true, function(session) {
      if (session.status) {
        module.exports.auth_model.getUser(req, function(user) {
          res.json(user);
        });
      } else {
        res.json(session);
      }
    });
  },
  logout: function(req, res) {
    module.exports.auth_model.verifySession(req, true, function(session) {
      if (session.status) {
        module.exports.auth_model.closeSession(req, function(closeOK) {
          res.json(closeOK);
        });
      } else {
        res.json(session);
      }
    });
  },
  verifySession: function(req, res, next) {
    var url_arr = req.url.split("/");
    var entity_base = url_arr[2].split("?");
    var entity_conf = req.app.dynamic.entities.find(
      entity => entity.name == entity_base[0]
    );
    var verify = entity_conf == undefined ? true : !entity_conf.freeAccess;
    module.exports.auth_model.verifySession(req, verify, function(session) {
      if (session.status) {
        next();
      } else {
        res.json(session);
      }
    });
  },
  changePassword: function(req, res) {
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let repPassword = req.body.repPassword;
    if (
      newPassword == repPassword &&
      newPassword.length > 5 &&
      req.app.bcrypt.compareSync(
        oldPassword,
        module.exports.auth_model.session_jwt.user_password
      )
    ) {
      let encodePassword = req.app.bcrypt.hashSync(newPassword, 4);
      module.exports.auth_model.changePassword(req, encodePassword, function(
        resp
      ) {
        res.json(resp);
      });
    } else {
      res.json({ status: false });
    }
  },
  newUser: function(req, res) {
    let encodePassword = req.app.bcrypt.hashSync(req.body.password, 4);
    module.exports.auth_model.newUser(req, encodePassword, function(resp) {
      if (resp.status) {
        res.json(resp);
      } else {
        res.status(500).json(resp);
      }
    });
  },
  requestPasswordReset: (req, res) => {
    let email = req.body.email;
    let randomstring = Math.random()
      .toString(36)
      .slice(-6);
    module.exports.auth_model.resetPassword(req, randomstring, email, resp => res.json(resp));
  }
};
