'use strict';

module.exports = {
    table: null,
    getByParameters: function(_req, _callback){
        _req.app.dynamic.query.select_construct(_req, module.exports.table, function(_sql, _values){
            _req.app.db.query(
                _sql,
                _values,
                function(data){
                    _req.app.dynamic.trigger.after_select(_req, module.exports.table, data, function(trigger_after_data){
                        _req.app.dynamic.format.json_tree(_req, trigger_after_data, _callback);
                    });
                });
        });
    },
    add: function(_req, _callback){
        _req.app.dynamic.validate.req_data(_req, module.exports.table, function(valid){
            if(valid.status){
                _req.app.dynamic.trigger.before_insert(_req, module.exports.table, function(trigger_before_data){
                    _req.app.dynamic.query.insert_construct(_req, module.exports.table, function(_sql, _values){
                        _req.app.db.query(
                            _sql,
                            _values,
                            function(data){
                                _req.app.dynamic.trigger.after_insert(_req, module.exports.table, data, function(trigger_after_data){
                                    _callback(trigger_after_data);
                                });
                            });
                    });
                });
            }else{
                _callback(valid);
            }
        });
    },
    update: function(_req, _callback){
        _req.app.dynamic.validate.req_data(_req, module.exports.table, function(valid){
            if(valid.status){
                _req.app.dynamic.trigger.before_update(_req, module.exports.table, function(trigger_before_data){
                    _req.app.dynamic.query.update_construct(_req, module.exports.table, function(_sql, _values){
                        _req.app.db.query(
                            _sql,
                            _values,
                            function(data){
                                _req.app.dynamic.trigger.after_update(_req, module.exports.table, data, function(trigger_after_data){
                                    _callback(trigger_after_data);
                                });
                            });
                    });
                });
            }else{
                _callback(valid);
            }
        });
    },
    delete: function(_req, _callback){
        _req.app.dynamic.trigger.before_delete(_req, module.exports.table, function(trigger_before_data){
            _req.app.dynamic.query.delete_construct(_req, module.exports.table, function(_sql, _values){
                _req.app.db.query(
                    _sql,
                    _values,
                    function(data){
                        _req.app.dynamic.trigger.after_delete(_req, module.exports.table, data, function(trigger_after_data){
                            _callback(trigger_after_data);
                        });
                    });
            });
        });
    }
};