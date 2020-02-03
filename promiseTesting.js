/*const request = require('request');

var options = {
    method: 'GET',
    url: 'https://transloc-api-1-2.p.rapidapi.com/routes.json',
    qs: {
      callback: 'call',
      agencies: '116'
    },
    headers: {
      'x-rapidapi-host': 'transloc-api-1-2.p.rapidapi.com',
      'x-rapidapi-key': '93a51b9988mshbaae07e32b41a78p1f7147jsna57f0fd7145a'
    }
    };
  var res = "";
  //var promise1 = new Promise(function(resolve, reject) {
  request(options, function (error, response, Routes_IDS) {
      if (error) throw new Error(error);
      let busNum = 121;
          let json = JSON.parse(Routes_IDS);
          let d = json.data[116];
  
          d.forEach(element => {
              if(element.short_name == busNum){
                res = "Bus #" + element.short_name + " is " + element.route_id;
              }
          });
          console.log(res);
    });
    //console.log("first: " + res);
    //resolve("Continuing");
    
  
    /*promise1
        .then(function(respond){
        console.log("Finished promise");
        console.log(res);
        })

        .catch(function(errorMessage) {
            console.log("big sad");
        });*/



        var options = {
          method: 'GET',
          url: 'https://transloc-api-1-2.p.rapidapi.com/routes.json',
          qs: {
            callback: 'call',
            agencies: '116'
          },
          headers: {
            'x-rapidapi-host': 'transloc-api-1-2.p.rapidapi.com',
            'x-rapidapi-key': '93a51b9988mshbaae07e32b41a78p1f7147jsna57f0fd7145a'
          }
        };
      
        return new Promise(function(resolve, reject) {
           request(options, function (error, response, Routes_IDS) {
            if (error) reject(error);
            let busNum = 121;
      
                let json = JSON.parse(Routes_IDS);
                let d = json.data[116];
      
                d.forEach(element => {
                    if(element.short_name == busNum){
                      let rID = element.route_id;
                        conv.ask("Bus #" + element.short_name + " is " + element.route_id);
                    }
                    //console.log(element.short_name + ' , ' + element.route_id);
                });
               resolve();
           });
        });