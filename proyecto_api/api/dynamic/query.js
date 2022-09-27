"use strict";

module.exports = {
  select_construct: function(req, table, _callback) {
    var fields =
      typeof req.query.fields !== "undefined" ? req.query.fields : "*";
    var filters =
      typeof req.query.filters !== "undefined" ? req.query.filters : "";
    var group = typeof req.query.group !== "undefined" ? req.query.group : "";
    var offset = typeof req.query.offset !== "undefined" ? req.query.offset : 0;
    var _limit = typeof req.query.limit !== "undefined" ? req.query.limit : 200;
    var sort =
      "a." + req.app.dynamic.entities.find(entity => entity.table == table).PK;
    var order =
      typeof req.query.order !== "undefined" ? req.query.order : "ASC";

    var select = "SELECT ";
    // load fields
    var parse_fields = true;
    var current_entity = {};
    if (fields == "*" || fields == "") {
      fields = "";
      current_entity = req.app.dynamic.entities.find(
        entity => entity.table == table
      );
      current_entity.fields.forEach(function(field, index) {
        fields =
          (index == 0 ? "a." + field.name : fields + ", a." + field.name) +
          " AS " +
          '"a.' +
          field.name +
          '"';
      });
    } else {
      fields.replace(/ /g, "");
      if (!fields.includes("a.")) {
        fields = "a." + fields;
        fields = fields.replace(/,/g, ",a.");
      }
      ["a.", "b.", "c.", "d.", "e."].forEach(function(prefix) {
        if (fields.includes(prefix)) {
          if (!fields.includes(prefix + "id")) {
            fields = fields + "," + prefix + "id";
          }
        }
      });
      var arrFields = fields.split(",");
      arrFields.forEach(function(field, index) {
        arrFields[index] = field + " AS " + '"' + field + '"';
      });
      fields = arrFields.join(",");
      parse_fields = false;
    }
    var from = " FROM " + table + " a";
    var join = "";
    var where = "";
    var limit = " LIMIT " + offset + "," + _limit;

    //JOINs
    var alias_num = 0;
    var param_entity = 0;
    for (var i = 0; i < Object.keys(req.params).length; i++) {
      var param = req.params["param" + (i + 1)];
      if (req.app.dynamic.validate.isInteger(param)) {
        //WHERE BY param
        var alias = i == 0 ? "a." : ["b.", "c.", "d.", "e."][alias_num - 1];
        var pk =
          i == 0
            ? req.app.dynamic.entities.find(entity => entity.table == table).PK
            : req.app.dynamic.entities.find(
                entity => entity.name == req.params["param" + i]
              ).PK;
        where =
          where == ""
            ? " WHERE " + alias + pk + "=" + param
            : where + " AND " + alias + pk + "=" + param;
      } else {
        //JOIN
        var table_alias =
          req.app.dynamic.entities.find(entity => entity.name == param).table +
          [" b", " c", " d", " e"][alias_num];
        //Buscar la relación
        var entity1 =
          alias_num == 0
            ? req.app.dynamic.entities.find(entity => entity.table == table)
            : req.app.dynamic.entities.find(
                entity => entity.name == req.params["param" + param_entity]
              );
        var entity2 = req.app.dynamic.entities.find(
          entity => entity.name == param
        );

        var _fk = entity2.FKs.find(_FK => _FK.table == entity1.table);
        if (typeof _fk !== "undefined") {
          var alias_table1 =
            alias_num == 0
              ? "a." + entity1.PK
              : ["b.", "c.", "d.", "e."][alias_num - 1] + entity1.PK;
          var alias_table2 = ["b.", "c.", "d.", "e."][alias_num] + _fk.field;
        } else {
          _fk = entity1.FKs.find(_FK => _FK.table == entity2.table);
          var alias_table1 =
            alias_num == 0
              ? "a." + _fk.field
              : ["b.", "c.", "d.", "e."][alias_num - 1] + _fk.field;
          var alias_table2 = ["b.", "c.", "d.", "e."][alias_num] + entity2.PK;
        }

        // set ON
        var on = alias_table1 + "=" + alias_table2;
        join = join + " LEFT JOIN " + table_alias + " ON " + on;
        //add fields
        if (parse_fields) {
          current_entity = req.app.dynamic.entities.find(
            entity => entity.name == param
          );
          current_entity.fields.forEach(function(field) {
            fields =
              fields +
              (", " + ["b", "c", "d", "e"][alias_num] + "." + field.name) +
              ' AS "' +
              ["b.", "c.", "d.", "e."][alias_num] +
              field.name +
              '"';
          });
        }
        //Increment vars
        alias_num = alias_num + 1;
        if (
          !req.app.dynamic.validate.isInteger(
            req.params["param" + (param_entity + 1)]
          )
        ) {
          param_entity = param_entity + 1;
        } else {
          param_entity = param_entity + 2;
        }
      }
    }

    //FILTERS
    var like_orderBy = "";
    if (filters != "") {
      var arrFilters = filters.split(",");
      arrFilters.forEach(function(filter) {
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
            arrLikesFields.forEach(function(likeField) {
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

    //GROUP BY
    var group_by_fields = [];
    var group_by = " ";
    if (typeof req.query.group !== "undefined") {
      group_by_fields = req.query.group.split(",");
      group_by_fields.forEach((_groupfield, ind) => {
        var group_prefix = _groupfield.substring(0, 2);
        var a = ["a.", "b.", "c.", "d.", "e."].indexOf(group_prefix);
        _groupfield = a == -1 ? "a." + _groupfield : _groupfield;
        group_by_fields[ind] = _groupfield;
      });
      group_by = " GROUP BY " + group_by_fields.join(",");
    }

    //ORDER BY
    var order_by_sort = [];
    var order_by_order = [];
    if (typeof req.query.sort !== "undefined") {
      order_by_sort = req.query.sort.split(",");
      order_by_order = order.split(",");
      order_by_sort.forEach((_sort, ind) => {
        var sort_prefix = _sort.substring(0, 2);
        var a = ["a.", "b.", "c.", "d.", "e."].indexOf(sort_prefix);
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

    //RETURN
    _callback(
      select + fields + from + join + where + group_by + order_by + limit,
      []
    );
  },
  insert_construct: function(req, table, _callback) {
    let current_entity = req.app.dynamic.entities.find(
      entity => entity.table == table
    );
    let arrFields = [];
    let arrQuestionMarks = [];
    let arrValues = [];
    current_entity.fields.forEach(function(field) {
      let val = req.body[field.name];
      if (val != undefined && current_entity.PK != field.name) {
        arrFields.push(field.name);
        arrQuestionMarks.push("?");
        arrValues.push(val);
      }
    });
    let insert = `INSERT INTO ${table}(${arrFields.join(
      ","
    )}) VALUES(${arrQuestionMarks.join(",")})`;
    //return
    _callback(insert, arrValues);
  },
  update_construct: function(req, table, _callback) {
    let current_entity = req.app.dynamic.entities.find(
      entity => entity.table == table
    );
    let arrFields = [];
    let arrValues = [];
    current_entity.fields.forEach(function(field) {
      let val = req.body[field.name];
      if (val != undefined && current_entity.PK != field.name) {
        arrFields.push(field.name + "=?");
        arrValues.push(val);
      }
    });
    arrValues.push(req.body[current_entity.PK]);
    let update = `UPDATE ${table} SET ${arrFields.join(",")} WHERE ${
      current_entity.PK
    }=?`;
    //return
    _callback(update, arrValues);
  },
  delete_construct: function(req, table, _callback) {
    let current_entity = req.app.dynamic.entities.find(
      entity => entity.table == table
    );
    let arrValues = [];
    arrValues.push(req.body[current_entity.PK]);
    let _delete = `DELETE FROM ${table} WHERE ${current_entity.PK}=?`;
    //return
    _callback(_delete, arrValues);
  }
};
