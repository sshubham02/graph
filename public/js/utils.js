let utils = {
    dbPostPage:function(page,data,successCallback,errorCallback){
        var url = page;
        var formdata = data+"&sid="+Math.random();
        $.ajax({
                url        : url,
                type       : "POST",
                cache      : false,
                data       : formdata,
                contentType: "application/x-www-form-urlencoded",
                success    : function (response){
                    if(typeof successCallback!='undefined'){
                        try{
                            if(successCallback != null){
                                successCallback(response);
                            }
                        }catch(e){

                        }
                    }else{
                        if(parseInt(response.code)==200){
                            if(typeof successCallback!='undefined'){
                                try{
                                    if(successCallback != null){
                                        successCallback(response);
                                    }
                                }catch(e){

                                }
                            }
                        }
                    }
                },
                error:function(){
                    if(typeof errorCallback!='undefined'){
                        try{
                            if(errorCallback != null){
                                errorCallback();
                            }
                        }catch(e){

                        }
                    }
                }
            }
        );
    },
    initDashboardCharts:function(){
        var formData='';
        this.dbPostPage('/getChart',formData,function(response){
            if(parseInt(response.code)===200){
                let row = response.row;
                let inr = (row.inr.length >0) ? row.inr : [];
                let dates = (row.dates.length >0) ? row.dates : [];
                var ctxLine = document.getElementById('lineAggragetes').getContext('2d');
                var myLineChart = new Chart(ctxLine, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            label: 'Tickets Open',
                            backgroundColor: 'rgb(0,100,0)',
                            borderColor: 'rgb(0,100,0)',
                            borderWidth: 0,
                            barThickness: 30,
                            fill:false,
                            data: inr
                        }]
                    },
                    // Configuration options go here
                    options: {
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    stacked: true
                                }
                            }]
                        }
                    }
                });
                var ctxBar = document.getElementById('myBarAggragetes').getContext('2d');
                var chart = new Chart(ctxBar, {
                    // The type of chart we want to create
                    type: 'bar',
                    data: {
                        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday', 'Sunday'],
                        datasets: [{
                            label: 'Conversation',
                            backgroundColor: 'rgb(0,0,255)',
                            borderColor: 'rgb(0,0,255)',
                            borderWidth:0,
                            barThickness: 30,
                            data: conversation
                        }]
                    },
                    options : {
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    offsetGridLines: true
                                }
                            }]
                        }
                    }
                });
            }
        });
    },
};