"use strict";
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
let dirPath = path.join(__dirname,'..');
const util = require(dirPath+"/util/functions.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getChart',function(req,res,next){
    let obj;
    let dates = util.enumerateDaysBetweenDates("2019-01-01","2019-01-31");
    let x_axis = [];
    let inr = [];
    fs.readFile(dirPath+"/Data/data.json", 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        let records = {};
        for (let key in obj.rates) {
            if (!obj.rates.hasOwnProperty(key)) continue;
            if(key>"2019-01-01" && key<"2019-01-31"){
                let obj_data = obj.rates[key];
                records[key]=obj_data;
            }
        }
        for(let y=0;y<dates.length;++y){
            if(typeof records[dates[y]]!='undefined'){
                let obj = records[dates[y]].INR;
                x_axis.push(dates[y]);
                inr.push(obj);
            }
        }
        let row={inr:inr,dates:x_axis};
        res.status(200).json({code:200,status:'success',row:row});
    });
});

module.exports = router;
