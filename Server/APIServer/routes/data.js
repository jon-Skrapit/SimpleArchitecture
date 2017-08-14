const express = require('express');
const Data = require('../models/data');
const config = require('../config');
const router = express.Router();
const logger = require('../util/logs');
const expire_time = 3600
const DataModel = require('../models/data')
/**
 * 
curl -X POST -H "Content-Type: application/json"      -d '{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMwMzAzMzQ1NjJ9.oPUeDgM07YKCeeFZoTEdQ0GY0U-rZ9X_wJThUHo6Dh4","data":{"one":1,"two":1,"three":1,"four":1}}'      "localhost:3000/datas/update"
*/
router.post('/update', function (req, res) {
    token = req.body.token
    data = req.body.data
    DataModel.update(token,data).then((result)=>{
        res.json(result)
    })
});
/**
 * 
curl -X POST -H "Content-Type: application/json"      -d '{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvbiIsImV4cGlyZXMiOjE1MDMwMzAzMzQ1NjJ9.oPUeDgM07YKCeeFZoTEdQ0GY0U-rZ9X_wJThUHo6Dh4"}'      "localhost:3000/datas/allData"
 */
router.post('/allData', function (req, res) {
    token = req.body.token
    DataModel.inquireAllData(token).then((result)=>{
        res.json(result)
    })
});
module.exports = router;