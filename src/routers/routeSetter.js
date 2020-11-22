const queries = require('../resources/queries.json');

const express = require('express');
const { makeRequest } = require('../db/resources');


function setRouters(app){
  for(const routerName in queries){
    const router = express.Router();
    for(const route in queries[routerName]["routes"]){
      const query = queries[route];
      const callback = async (req, res) => {
      const reqData = {
        req, res,
        query: query.query,
        queryParamsOrder: query.order,
      };
      await makeRequest(reqData);
    }
    if(query.type == "get"){
      router.get(query.path, callback);
    }
    else if(query.type == "post"){
      router.post(query.path, callback);
    }
    else if(query.type == "put"){
      router.put(query.path, callback);
    }
  }
  app.use(queries[routerName], router)
  }
}



module.exports = { setRouters };
