var request = require("request");

var options = {
  method: 'GET',
  url: 'https://transloc-api-1-2.p.rapidapi.com/arrival-estimates.json',
  qs: {
    routes: '4001150',//'4000421%2C4000592%2C4005122',
    stops: '4191470',//'4002123%2C4023414%2C4021521',
    callback: 'call',
    agencies: '116'
  },
  headers: {
    'x-rapidapi-host': 'transloc-api-1-2.p.rapidapi.com',
    'x-rapidapi-key': '93a51b9988mshbaae07e32b41a78p1f7147jsna57f0fd7145a'
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	//body = JSON.parse(body);

	console.log(body);
});

//{"rate_limit": 1, "expires_in": 5, "api_latest_version": "1.2", "generated_on": "2020-02-01T13:57:45+00:00", "data": [{"arrivals": [{"route_id": "4001150", "vehicle_id": "4008140", "arrival_at": "2020-02-01T09:07:19-05:00", "type": "vehicle-based"}, {"route_id": "4001150", "vehicle_id": "4012657", "arrival_at": "2020-02-01T09:41:07-05:00", "type": "vehicle-based"}], "agency_id": "116", "stop_id": "4191470"}], "api_version": "1.2"}