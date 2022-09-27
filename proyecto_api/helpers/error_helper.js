'use strict';

module.exports = {
    register: function(req, code, session_id, callback) {
        req.app.db.query(
            'insert into sys_error(date_time, ip_address, url, sys_session_id, sys_error_code_id) values(NOW(),?,?,?,?)',
            [req.connection.remoteAddress, req.url, session_id, code],
            function(){
                callback();
            }
        );
    },
    response: function(req, code, callback) {
        req.app.db.query(
            'select * from sys_error_code where id=?',
            [code],
            function(error_code){
                error_code[0].status = false;
                error_code[0].code = code;
                callback(error_code[0]);
            }
        );
    },
    login_attempt: function(req, user_id, callback){
        req.app.db.query(
            'insert into sys_login_attempt(ip_address, date_time, sys_user_id) values(?,NOW(),?)',
            [req.connection.remoteAddress, user_id],
            function(){
                callback();
            }
        );
    }
};