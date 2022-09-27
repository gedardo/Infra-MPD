'use strict';

module.exports = {
    after_select: function(req, table, data, callback) {
        switch(table) {
            case 'sys_picture':
                if(data.length > 0){
                    callback(data);
                }else{
                    req.app.helpers.file.getImgDefaultProfile((err, img) => {
                        callback([{"a.id": 0, "a.pic": img}]);
                    });
                }
                break;
            default:
                callback(data);
        }
    },
    before_insert: function(req, table, callback) {
        switch(table) {
            case 'sys_user':
                let cryptPass = typeof req.body.password  !== 'undefined' ? req.body.password : 'password';
                req.body.password = req.app.bcrypt.hashSync(cryptPass, 4);
                callback();
            break;

            default:
                callback();
        }
    },
    after_insert: function(req, table, data, callback) {
        let newResp = {
            status: true,
            insertId: data.insertId
        }
        switch(table) {
            case 'sys_user':
                let sys_group_id = req.body['sys_group_id'];
                if(sys_group_id != undefined){
                    let _values = [newResp.insertId, sys_group_id];
                    req.app.db.query(
                        "INSERT INTO sys_user_group(sys_user_id, sys_group_id) VALUES(?,?)",
                        _values,
                        function(data){
                            newResp.sys_user_id = newResp.insertId;
                            newResp.sys_group_id = sys_group_id;
                            newResp.sys_user_group_id = data.insertId;
                            callback(newResp);
                        });
                }else{
                    callback(newResp);
                }
                break;
            case 'travel':
                if(newResp.driver_id !== null) {
                    req.app.db.query("SELECT id FROM driver ORDER BY RAND() LIMIT 1",[],(resp) => {
                        let driver_id = resp[0].id;
                        req.app.db.query(
                            "UPDATE travel SET driver_id = ? WHERE id = ?",
                            [driver_id, newResp.insertId],
                            function(data){
                                newResp.driver_id = driver_id
                                callback(newResp);
                            });
                        })
                    
                } else{
                    callback(newResp);
                }
                break;
            default:
                callback(newResp);
        }
    },
    before_update: function(req, table, callback) {
        switch(table) {
            case 'sys_user':
                let encryptPassword = typeof req.body.encryptPassword  !== 'undefined' ? req.body.encryptPassword : false;
                if(encryptPassword){
                    let cryptPass = typeof req.body.password  !== 'undefined' ? req.body.password : 'password';
                    req.body.password = req.app.bcrypt.hashSync(cryptPass, 4);
                }
                callback();
            break;
            default:
                callback();
        }
    },
    after_update: function(req, table, data, callback) {
        let newResp = {};
        if(data.affectedRows > 0){
            newResp.status = true;
        }else{
            newResp.status = false;
        }
        callback(newResp);
    },
    before_delete: function(req, table, callback) {
        callback();
    },
    after_delete: function(req, table, data, callback) {
        let newResp = {};
        if(data.affectedRows > 0){
            newResp.status = true;
        }else{
            newResp.status = false;
        }
        callback(newResp);
    }
};