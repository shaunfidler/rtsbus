var request = require("request");
var fs = require("fs");

var options = {
  method: 'GET',
  url: 'https://transloc-api-1-2.p.rapidapi.com/stops.json',
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

request(options, function (error, response, body) {
	if (error) throw new Error(error);

    body = JSON.parse(body);
    let b = body.data;

    b.forEach(element => {
        console.log("Name: " + element.name);
        console.log("Stop ID: " + element.stop_id);
    })

    //console.log(body);
    
});