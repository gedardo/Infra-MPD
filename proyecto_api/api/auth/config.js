"use strict";

module.exports = function() {
  switch (process.env.NODE_ENV) {
    case "development":
      return {
        secret: "TuCu_M3n5@J3r1A",
        login_attempt: 5
      };
      break;
    case "testing":
      return {
        secret: "TuCu_M3n5@J3r1A",
        login_attempt: 5
      };
      break;
    case "production":
      return {
        secret: "TuCu_M3n5@J3r1A",
        login_attempt: 5
      };
      break;
    default:
      return {
        secret: "TuCu_M3n5@J3r1A",
        login_attempt: 5
      };
  }
};
