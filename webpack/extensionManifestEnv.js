const pjson = require("../package.json");

module.exports = {
  version: pjson.version,
  description: pjson.description,
  name: {
    development: pjson.name + " DEV",
    production: pjson.name
  }
};
