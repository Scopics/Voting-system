var fs = require("fs");
var contents = fs.readFileSync("./resources/queries.json");
var queries = JSON.parse(contents);

module.exports = {queries};