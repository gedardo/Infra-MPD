"use strict";

module.exports = {
  table: null,
  getTarea_tipo_oficina_inmueble_usuario_cliente: function (_req, _callback) {
    var filters =
      typeof _req.query.filters !== "undefined" ? _req.query.filters : "";
    var select = "SELECT ";
    var fields =
      " a.*, b.id as tipo_tarea_id, b.nombre as tipo_tarea_nombre,b.descripcion as tipo_tarea_descripcion,d.id as inmueble_id,d.nombre as inmueble_nombre, c.id as oficina_id, c.nombre as oficina_nombre, e.first_name as usuario_nombre, e.last_name as usuario_apellido, f.nombre as cliente_nombre, f.apellido as cliente_apellido ";
    var from = " FROM tarea a ";
    var join =
      " LEFT JOIN tipo_tarea b ON a.tipo_tarea_id=b.id LEFT JOIN oficina c ON a.oficina_id=c.id LEFT JOIN inmueble d ON c.inmueble_id=d.id LEFT JOIN sys_user e ON a.sys_user_id=e.id LEFT JOIN cliente f ON a.cliente_id=f.id ";
    var where = "";
    var sort = "a.id";
    var order =
      typeof _req.query.order !== "undefined" ? _req.query.order : "ASC";
    var order_by = ""; //' order by a.id DESC';
    var like_orderBy = "";

    if (filters != "") {
      var arrFilters = filters.split(",");
      arrFilters.forEach(function (filter) {
        if (filter.indexOf('"') != -1) {
          filter = filter.replace(/"/g, "");
          where = where == "" ? " WHERE " + filter : where + " AND " + filter;
        } else {
          if (filter.indexOf("LIKE") != -1 || filter.indexOf("like") != -1) {
            var arrLikes = [];
            if (filter.indexOf("LIKE") != -1) {
              arrLikes = filter.split("LIKE");
            }
            if (filter.indexOf("like") != -1) {
              arrLikes = filter.split("like");
            }
            arrLikes[0] = arrLikes[0].trim();
            var arrLikesFields = arrLikes[0].split(" ");
            var LikeValue = arrLikes[1].trim();
            var arrLikeWhere = [];
            var arrLikeOrderBy = [];
            arrLikesFields.forEach(function (likeField) {
              arrLikeWhere.push(`${likeField} LIKE '%${LikeValue}%'`);
              arrLikeOrderBy.push(
                `CASE WHEN ${likeField} like '${LikeValue}%' THEN 0 WHEN ${likeField} like '% %${LikeValue}% %' THEN 1 WHEN ${likeField} like '%${LikeValue}' THEN 2 ELSE 3 END, ${likeField} ASC`
              );
            });
            var likeSentence = `(${arrLikeWhere.join(" OR ")})`;
            where =
              where == ""
                ? " WHERE " + likeSentence
                : where + " AND " + likeSentence;
            like_orderBy = arrLikeOrderBy.join(",");
          } else {
            if (filter.indexOf(":") != -1) {
              where =
                where == ""
                  ? " WHERE " + filter.replace(/:/g, '="') + '"'
                  : where + " AND " + filter.replace(/:/g, '="') + '"';
            } else {
              filter = filter.replace(/>/g, '>"');
              filter = filter.replace(/</g, '<"');
              filter = filter.replace(/=/g, '="');
              where =
                where == ""
                  ? " WHERE " + filter + '"'
                  : where + " AND " + filter + '"';
            }
          }
        }
      });
    }

    //ORDER BY
    var order_by_sort = [];
    var order_by_order = [];
    if (typeof _req.query.sort !== "undefined") {
      order_by_sort = _req.query.sort.split(",");
      order_by_order = order.split(",");
      order_by_sort.forEach((_sort, ind) => {
        var sort_prefix = _sort.substring(0, 2);
        var a = ["a.", "b.", "c."].indexOf(sort_prefix);
        _sort = a == -1 ? "a." + _sort : _sort;
        order_by_sort[ind] =
          _sort +
          " " +
          (typeof order_by_order[ind] !== "undefined"
            ? order_by_order[ind]
            : "ASC");
      });
    } else {
      order_by_sort.push(sort + " " + order);
    }
    var order_by =
      " ORDER BY " +
      (like_orderBy != "" ? like_orderBy + "," : "") +
      order_by_sort.join(",");

    _req.app.db.query(
      select + fields + from + join + where + order_by,
      [],
      function (_data) {
        if (_data.length > 0) {
          let _tareas = [];
          _data.forEach((tarea) => {
            const {
              id,
              inmueble_nombre,
              inmueble_id,
              oficina_nombre,
              oficina_id,
              created_at,
              comentario,
              observacion,
              tipo_tarea_id,
              tipo_tarea_nombre,
              tipo_tarea_descripcion,
              usuario_nombre,
              usuario_apellido,
              cliente_nombre,
              cliente_apellido
            } = tarea;
            let f =
            created_at.getFullYear() +
              "-" +
              ("0" + (created_at.getMonth() + 1)).slice(-2) +
              "-" +
              ("0" + created_at.getDate()).slice(-2) +
              " " +
              ("0" + created_at.getHours()).slice(-2) +
              ":" +
              ("0" + created_at.getMinutes()).slice(-2) +
              ":" +
              ("0" + created_at.getSeconds()).slice(-2);
            let newEstructure = {
              id,
              fecha: f,
              comentario,
              observacion,
              inmueble: {
                id: inmueble_id,
                nombre: inmueble_nombre,
              },
              oficina: {
                id: oficina_id,
                nombre: oficina_nombre,
              },
              tipo_tarea: {
                id: tipo_tarea_id,
                nombre: tipo_tarea_nombre,
                descripcion: tipo_tarea_descripcion,
              },
              usuario: {
                nombre: `${usuario_nombre} ${usuario_apellido}`
              },
              cliente: cliente_nombre!=null ? {
                nombre: `${cliente_nombre} ${cliente_apellido}`
              } : undefined,
            };
            _tareas.push(newEstructure);
          });
          _callback(_tareas);
        } else {
          _callback(_data);
        }
      }
    );
  },
  newRequest: function (_req, data, _callback) {
    _req.app.db.query("",[],(resp)=>{console.log(resp)})
  },

  add: function (_req, _callback) {
    _req.app.reflect.validate.req_data(_req, module.exports.table, function (
      valid
    ) {
      if (valid.status) {
        _req.app.reflect.trigger.before_insert(
          _req,
          module.exports.table,
          function (trigger_before_data) {
            _req.app.reflect.query.insert_construct(
              _req,
              module.exports.table,
              function (_sql, _values) {
                _req.app.db.query(_sql, _values, function (data) {
                  _req.app.reflect.trigger.after_insert(
                    _req,
                    module.exports.table,
                    data,
                    function (trigger_after_data) {
                      _callback(trigger_after_data);
                    }
                  );
                });
              }
            );
          }
        );
      } else {
        _callback(valid);
      }
    });
  },
  update: function (_req, _callback) {
    _req.app.reflect.validate.req_data(_req, module.exports.table, function (
      valid
    ) {
      if (valid.status) {
        _req.app.reflect.trigger.before_update(
          _req,
          module.exports.table,
          function (trigger_before_data) {
            _req.app.reflect.query.update_construct(
              _req,
              module.exports.table,
              function (_sql, _values) {
                _req.app.db.query(_sql, _values, function (data) {
                  _req.app.reflect.trigger.after_update(
                    _req,
                    module.exports.table,
                    data,
                    function (trigger_after_data) {
                      _callback(trigger_after_data);
                    }
                  );
                });
              }
            );
          }
        );
      } else {
        _callback(valid);
      }
    });
  },
  delete: function (_req, _callback) {
    _req.app.reflect.trigger.before_delete(
      _req,
      module.exports.table,
      function (trigger_before_data) {
        _req.app.reflect.query.delete_construct(
          _req,
          module.exports.table,
          function (_sql, _values) {
            _req.app.db.query(_sql, _values, function (data) {
              _req.app.reflect.trigger.after_delete(
                _req,
                module.exports.table,
                data,
                function (trigger_after_data) {
                  _callback(trigger_after_data);
                }
              );
            });
          }
        );
      }
    );
  },
};
