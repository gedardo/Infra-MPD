'use strict';

module.exports = {
    fs: require('fs'),
    getImgDefaultProfile: function(callback) {
        module.exports.fs.readFile('./helpers/tpls/ImgDefaultProfile2.B64', {encoding: 'utf-8'}, function (err, data) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, data);
            }
        });
    },
    readTPLFile: function(path, callback) {
        module.exports.fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    },
    TPL_email_contact: function(callback) {
        module.exports.fs.readFile('./helpers/tpls/email_contact.html', {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    },
    TPL_email_link_boleto: function(callback) {
        module.exports.fs.readFile('./helpers/tpls/email_link_boleto.html', {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    },
    TPL_email_link_pago: function(callback) {
        module.exports.fs.readFile('./helpers/tpls/email_link_pago.html', {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    },
    TPL_email_pago_cancelado: function(callback) {
        module.exports.fs.readFile('./helpers/tpls/email_pago_cancelado.html', {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    }
};