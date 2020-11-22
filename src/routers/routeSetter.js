const queries = require('../resources/queries.json');
const express = require('express');
const { makeRequest } = require('../db/resources');

function routeSetter(app){
  for(const i in queries){
    const router = express.Router();
    for(const route of queries[i].routes){
      const callback = async (req, res) => {
      const reqData = {
        req, res,
        query: route.query,
        queryParamsOrder: route.order,
      };
      await makeRequest(reqData);
    }
    if(route.type == 'get'){
      router.get(route.path, callback);
    }
    else if(route.type == 'post'){
      router.post(route.path, callback);
    }
    else if(route.type == 'put'){
      router.put(route.path, callback);
    }
  }
  app.use(queries[i].path, router)
  }
}



module.exports = { routeSetter };
