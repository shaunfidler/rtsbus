var request = require("request");
var fs = require("fs");

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

request(options, function (error, response, body) {
	if (error) throw new Error(error);

    body = JSON.parse(body);
    sData = JSON.stringify(body, 0, 4);

    fs.writeFile("Routes_IDS.json", sData, 'utf8', function(err){
        if(err) {console.log(err);} else {console.log("Exported");}

    })
    console.log(body);
    
});