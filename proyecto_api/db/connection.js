'use strict';

module.exports = {
    mysql: require('mysql'),
    config: require('./config')(),
    query: function(_sql, _values ,_callback){
        var conn = module.exports.mysql.createConnection(module.exports.config);
        conn.connect(function(err) {
            if (err) throw err;
            conn.query(_sql, _values, function (err, result) {
                //Debug Mode
                if(process.env.NODE_ENV == 'development'){
                    console.log("------------------------------------------------<query>----------------------------------------------------");
                    console.log("QUERY: " + _sql);
                    console.log("VALUES: " + _values);
                    console.log("------------------------------------------------</query>---------------------------------------------------");
                }                
                if (err) throw err;
                _callback(result);
                conn.end();
            });
        });
    }
};