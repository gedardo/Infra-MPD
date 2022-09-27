"use strict";

module.exports = {
  config: require("./config")(),
  session_jwt: null,
  newSession: function(_req, _callback) {
    _req.app.db.query(
      'select * from sys_user where (email=? and email<>"") ',
      [_req.body.user, _req.body.user],
      function(user) {
        var response = {};
        if (user.length > 0) {
          if (user[0].active == 1) {
            _req.app.db.query(
              "select count(*) as attempts from sys_login_attempt where sys_user_id=? and date_time >= CURDATE()",
              [user[0].id],
              function(log) {
                if (
                  log[0].attempts < module.exports.config.login_attempt ||
                  module.exports.config.login_attempt == 0
                ) {
                  if (
                    _req.body.password != "" &&
                    typeof _req.body.password != "undefined" &&
                    (_req.app.bcrypt.compareSync(
                      _req.body.password,
                      user[0].password
                    ))
                  ) {
                    _req.app.db.query(
                      "insert into sys_session(ip_address, dt_start, user_agent, status, sys_user_id) values(?, NOW(), ?, ?, ?)",
                      [
                        _req.connection.remoteAddress,
                        _req.headers["user-agent"],
                        1,
                        user[0].id
                      ],
                      function(newSession) {
                        const payload = {
                          user_id: user[0].id,
                          user_email: user[0].email,
                          user_password: user[0].password,
                          session_id: newSession.insertId
                        };
                        var token = _req.app.jwt.sign(
                          payload,
                          module.exports.config.secret,
                          {
                            //expiresIn: '5d'
                          }
                        );
                        response.status = true;
                        response.jwt = token;
                        _callback(response);
                      }
                    );
                  } else {
                    _req.app.helpers.error.login_attempt(
                      _req,
                      user[0].id,
                      function() {
                        _req.app.helpers.error.register(
                          _req,
                          2,
                          null,
                          function() {
                            _req.app.helpers.error.response(_req, 2, _callback);
                          }
                        );
                      }
                    );
                  }
                } else {
                  _req.app.helpers.error.login_attempt(
                    _req,
                    user[0].id,
                    function() {
                      _req.app.helpers.error.register(
                        _req,
                        4,
                        null,
                        function() {
                          _req.app.helpers.error.response(_req, 4, _callback);
                        }
                      );
                    }
                  );
                }
              }
            );
          } else {
            _req.app.helpers.error.register(_req, 3, null, function() {
              _req.app.helpers.error.response(_req, 3, _callback);
            });
          }
        } else {
          _req.app.helpers.error.register(_req, 1, null, function() {
            _req.app.helpers.error.response(_req, 1, _callback);
          });
        }
      }
    );
  },
  getUser: function(_req, _callback) {
    _req.app.db.query(
      "select u.*,g.id as groupId,g.name,g.description,p.id as picId, p.pic from sys_user u LEFT JOIN sys_user_group ug ON u.id=ug.sys_user_id LEFT JOIN sys_group g ON ug.sys_group_id=g.id LEFT JOIN sys_picture p ON u.id=p.sys_user_id where u.id =?",
      [module.exports.session_jwt.user_id],
      function(user) {
        user[0].session_id = module.exports.session_jwt.session_id;
        _callback(user);
      }
    );
  },
  verifySession: function(_req, verify, _callback) {
    if (verify) {
      if (typeof _req.headers["authorization"] !== "undefined") {
        try {
          var token = _req.headers["authorization"].replace(/Bearer /, "");
          var jwt = _req.app.jwt.verify(token, module.exports.config.secret);
          _req.app.db.query(
            "select u.is_admin, u.id as user_id, s.id as session_id from sys_user u inner join sys_session s on u.id = s.sys_user_id  where u.id=? and u.email=? and u.password=? and s.id=? and s.dt_finished is NULL and s.user_agent=? and s.status=1",
            [
              jwt.user_id,
              jwt.user_email,
              jwt.user_password,
              jwt.session_id,
              _req.headers["user-agent"]
            ],
            function(session) {
              if (session.length > 0) {
                module.exports.session_jwt = jwt;
                module.exports.session_jwt.is_admin = (session.is_admin = 1)
                  ? true
                  : false;
                _callback({ status: true });
              } else {
                _req.app.helpers.error.register(_req, 6, null, function() {
                  _req.app.helpers.error.response(_req, 6, _callback);
                });
              }
            }
          );
        } catch (error) {
          _req.app.helpers.error.register(_req, 6, null, function() {
            _req.app.helpers.error.response(_req, 6, _callback);
          });
        }
      } else {
        _req.app.helpers.error.register(_req, 6, null, function() {
          _req.app.helpers.error.response(_req, 6, _callback);
        });
      }
    } else {
      _callback({ status: true });
    }
  },
  closeSession: function(_req, _callback) {
    _req.app.db.query(
      "update sys_session set status = 0, dt_finished = NOW()  where id =?",
      [module.exports.session_jwt.session_id],
      function() {
        _callback({ status: true });
      }
    );
  },
  changePassword: function(_req, newPassword, _callback) {
    _req.app.db.query(
      "update sys_user set password = ? where id =?",
      [newPassword, module.exports.session_jwt.user_id],
      function() {
        _callback({ status: true });
      }
    );
  },
  resetPassword: function(_req, newPassword, email, _callback) {
    let encodePassword = _req.app.bcrypt.hashSync(newPassword, 4);
    _req.app.db.query(
      "update sys_user set password = ? where email = ?",
      [encodePassword, email],
      function() {
        _callback({ status: true, newPassword });
      }
    );
  },
  newUser: function(_req, newPassword, _callback) {
    _req.app.db.query(
      "CALL crearUsuario(?,?,?,?)",
      [_req.body.email, newPassword, _req.body.firstName, _req.body.lastName],
      function(resp) {
        _callback({
          status: resp[0][0].v_user_created > 0 ? true : false,
          userId: resp[0][0].v_user_created,
          mensaje: resp[0][0].mensaje
        });
      }
    );
  },
};
