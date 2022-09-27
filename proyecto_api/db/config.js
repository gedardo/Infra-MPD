"use strict";
require('dotenv').config();

module.exports = function() {
  return {
    host: process.env.DB_HOST !== undefined ? process.env.DB_HOST : "localhost",
    user: process.env.DB_USER !== undefined ? process.env.DB_USER : "root",
    password:
      process.env.DB_PASS !== undefined ? process.env.DB_PASS : "root",
    database:
      process.env.DB_NAME !== undefined ? process.env.DB_NAME : "mpd_informe",
    port:
      process.env.PORT !== undefined ? process.env.PORT : "3307"
  };
};
