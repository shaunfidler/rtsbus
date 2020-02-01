var request = require("request");

var options = {
  method: 'GET',
  url: 'https://transloc-api-1-2.p.rapidapi.com/agencies.json',
  qs: {
    agencies: '116',
    callback: 'call',
    //geo_area: ''//'35.80176%2C-78.64347%7C35.78061%2C-78.68218'
  },
  headers: {
    'x-rapidapi-host': 'transloc-api-1-2.p.rapidapi.com',
    'x-rapidapi-key': '93a51b9988mshbaae07e32b41a78p1f7147jsna57f0fd7145a'
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});

/*{"long_name": "University of Florida / RTS", "language": "en", "position": {"lat": 29.6392, "lng": -82.3465}, "name": "ufl", "short_name": "UFLRTS", "phone": null, "url": null, "timezone": "America/New_York", "bounding_box": [{"lat": 29.52224, "lng": -82.43934}, {"lat": 29.71513, "lng": -82.26507}], "agency_id":
"116"},*/

/*
{"rate_limit": 1, "expires_in": 300, "api_latest_version": "1.2", "generated_on": "2020-02-01T08:03:06+00:00", 
"data": [{"long_name": "University of Florida / RTS", "language": "en", "position": {"lat": 29.6392, "lng": -82.3465}, 
"name": "ufl", "short_name": "UFLRTS", "phone": null, "url": null, "timezone": "America/New_York", 
"bounding_box": [{"lat": 29.52224, "lng": -82.43934}, {"lat": 29.71513, "lng": -82.26507}], "agency_id": "116"}], "api_version": "1.2"}
*/