const queries = require('../resources/queries.json');

function generate(req, res, source){
    const query = queries[source];
   const reqData = {
    req, res,
    query: query.query,
    queryParamsOrder: query.order,
  }; 
  return reqData;
}

module.exports = { generate };
