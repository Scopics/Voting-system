const fs = require("fs");
const fileContent = fs.readFileSync('src/resources/queries.json');
const queries = JSON.parse(fileContent);

module.exports = { queries };