var fs = require("fs");
var request = require("request");

var options = {
  method: 'GET',
  url: 'https://transloc-api-1-2.p.rapidapi.com/routes.json',
  qs: {
    callback: 'call',
    //geo_area: '35.80176%2C-78.64347%7C35.78061%2C-78.68218',
    agencies: '116'
  },
  headers: {
    'x-rapidapi-host': 'transloc-api-1-2.p.rapidapi.com',
    'x-rapidapi-key': '93a51b9988mshbaae07e32b41a78p1f7147jsna57f0fd7145a'
  }
};

request(options, function (error, response, Routes_IDS) {
	if (error) throw new Error(error);

    //body = JSON.parse(body);
    //Routes_IDS = body;
    let busNum = 121;
    //console.log(Routes_IDS);

    /*fs.readFile("Routes_IDS.json", 'utf8', (err, data) =>{
    if(err) console.log(err);*/

        //Routes_IDS = body;
        let json = JSON.parse(Routes_IDS);
        let d = json.data[116];

        d.forEach(element => {
            if(element.short_name == busNum){
                console.log("Bus #" + element.short_name + " is " + element.route_id);
            }
            //console.log(element.short_name + ' , ' + element.route_id);
        });
    
});