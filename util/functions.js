const moment = require("moment");

module.exports = {
    enumerateDaysBetweenDates : function(startDate, endDate){
        let date = [];
        while(moment(startDate) <= moment(endDate)){
            date.push(startDate);
            startDate = moment(startDate).add(1, 'days').format("YYYY-MM-DD");
        }
        return date;
    },
};