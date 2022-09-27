'use strict';

module.exports = {
    json_tree: function(req, data, callback) {
        // seteo niveles del arbol
        var levels = [];
        var indexLevel = 0;
        for(var i = 0; i < Object.keys(req.params).length; i++){
            var param = req.params['param'+ (i+1)];
            if(!req.app.dynamic.validate.isInteger(param)){
                levels[['b','c','d','e'][indexLevel]] = param;
                indexLevel++;
            }
        };
        //construyo el resultado en forma de árbol
        var result = [];
        data.forEach(function (row) {
            var objData_a = {};
            var objData_b = {};
            var objData_c = {};
            var objData_d = {};
            var objData_e = {};
            
            //Agrupo los campos segun el prefix
            Object.keys(row).forEach(function (field) {
                switch(field.substring(0, 2)) {
                    case 'a.':
                        objData_a[field.replace(/a./,'')] = row[field];
                        break;
                    case 'b.':
                        objData_b[field.replace(/b./,'')] = row[field];
                        break;
                    case 'c.':
                        objData_c[field.replace(/c./,'')] = row[field];
                        break;
                    case 'd.':
                        objData_d[field.replace(/d./,'')] = row[field];
                        break;
                    case 'e.':
                        objData_e[field.replace(/e./,'')] = row[field];
                        break;
                    default:
                        objData_a[field.replace(/a./,'')] = row[field];
                }
            });
            
            //NIVEL 1
            // Busco si el row ya existe en el result por prefix a
            var obj_in_process_a = result.find((field)=>field['id'] == row['a.id']);
            if(typeof obj_in_process_a === 'undefined'){
                // Reagrupo los datos según el nivel
                if(typeof levels['e'] !== 'undefined' && levels['e'] !== null && objData_e.id != null){
                    objData_d[levels['e']] = [];
                    objData_d[levels['e']].push(objData_e);
                }
                if(typeof levels['d'] !== 'undefined' && levels['d'] !== null && objData_d.id != null){
                    objData_c[levels['d']] = [];
                    objData_c[levels['d']].push(objData_d);
                }
                if(typeof levels['c'] !== 'undefined' && levels['c'] !== null && objData_c.id != null){
                    objData_b[levels['c']] = [];
                    objData_b[levels['c']].push(objData_c);
                }
                if(typeof levels['b'] !== 'undefined' && levels['b'] !== null && objData_b.id != null){
                    objData_a[levels['b']] = [];
                    objData_a[levels['b']].push(objData_b);
                }
                result.push(objData_a);
            }else{
                //NIVEL 2
                if(typeof levels['b'] !== 'undefined' && levels['b'] !== null){
                    if(typeof obj_in_process_a[levels['b']] === 'undefined') {obj_in_process_a[levels['b']] = [];}
                    var obj_in_process_b = obj_in_process_a[levels['b']].find((field)=>field['id'] == row['b.id']);
                    if(typeof obj_in_process_b === 'undefined'){
                        if(typeof levels['e'] !== 'undefined' && levels['e'] !== null && objData_e.id != null){
                            objData_d[levels['e']] = [];
                            objData_d[levels['e']].push(objData_e);
                        }
                        if(typeof levels['d'] !== 'undefined' && levels['d'] !== null && objData_d.id != null){
                            objData_c[levels['d']] = [];
                            objData_c[levels['d']].push(objData_d);
                        }
                        if(typeof levels['c'] !== 'undefined' && levels['c'] !== null && objData_c.id != null){
                            objData_b[levels['c']] = [];
                            objData_b[levels['c']].push(objData_c);
                        }
                        obj_in_process_a[levels['b']].push(objData_b);
                    }else{
                        //NIVEL 3
                        if(typeof levels['c'] !== 'undefined' && levels['c'] !== null){
                            if(typeof obj_in_process_b[levels['c']] === 'undefined') {obj_in_process_b[levels['c']] = [];}
                            var obj_in_process_c = obj_in_process_b[levels['c']].find((field)=>field['id'] == row['c.id']);
                            if(typeof obj_in_process_c === 'undefined'){
                                if(typeof levels['e'] !== 'undefined' && levels['e'] !== null && objData_e.id != null){
                                    objData_d[levels['e']] = [];
                                    objData_d[levels['e']].push(objData_e);
                                }
                                if(typeof levels['d'] !== 'undefined' && levels['d'] !== null && objData_d.id != null){
                                    objData_c[levels['d']] = [];
                                    objData_c[levels['d']].push(objData_d);
                                }
                                obj_in_process_b[levels['c']].push(objData_c);
                                var index_b = obj_in_process_a[levels['b']].map(function(e) { return e.id; }).indexOf(row['b.id']);
                                obj_in_process_a[levels['b']][index_b] = obj_in_process_b;
                            }else{
                                //NIVEL 4
                                if(typeof levels['d'] !== 'undefined' && levels['d'] !== null){
                                    if(typeof obj_in_process_c[levels['d']] === 'undefined') {obj_in_process_c[levels['d']] = [];}
                                    var obj_in_process_d = obj_in_process_c[levels['d']].find((field)=>field['id'] == row['d.id']);
                                    if(typeof obj_in_process_d === 'undefined'){
                                        if(typeof levels['e'] !== 'undefined' && levels['e'] !== null && objData_e.id != null){
                                            objData_d[levels['e']] = [];
                                            objData_d[levels['e']].push(objData_e);
                                        }
                                        obj_in_process_c[levels['d']].push(objData_d);
                                        var index_b = obj_in_process_a[levels['b']].map(function(e) { return e.id; }).indexOf(row['b.id']);
                                        var index_c = obj_in_process_b[levels['c']].map(function(e) { return e.id; }).indexOf(row['c.id']);
                                        obj_in_process_a[levels['b']][index_b][levels['c']][index_c] = obj_in_process_c;
                                    }else{
                                        //NIVEL 5
                                        if(typeof levels['e'] !== 'undefined' && levels['e'] !== null){
                                            if(typeof obj_in_process_d[levels['e']] === 'undefined') {obj_in_process_d[levels['e']] = [];}
                                            var obj_in_process_e = obj_in_process_d[levels['e']].find((field)=>field['id'] == row['e.id']);
                                            if(typeof obj_in_process_e === 'undefined'){
                                                if(objData_e.id != null){
                                                    obj_in_process_d[levels['e']].push(objData_e);
                                                }                                                
                                                var index_b = obj_in_process_a[levels['b']].map(function(e) { return e.id; }).indexOf(row['b.id']);
                                                var index_c = obj_in_process_b[levels['c']].map(function(e) { return e.id; }).indexOf(row['c.id']);
                                                var index_d = obj_in_process_c[levels['d']].map(function(e) { return e.id; }).indexOf(row['d.id']);
                                                obj_in_process_a[levels['b']][index_b][levels['c']][index_c][levels['d']][index_d] = obj_in_process_d;
                                            }
                                        }
                                    }
                                }
                            }
                        }                        
                    }
                }
                //Busco el objeto en result y lo reemplazo por el generado con los cambios
                var index_a = result.map(function(e) { return e.id; }).indexOf(row['a.id']);
                result[index_a] = obj_in_process_a;
            }
        });
        callback(result);
    }
};