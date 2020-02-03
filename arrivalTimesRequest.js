var request = require("request");

var options = {
  method: 'GET',
  url: 'https://transloc-api-1-2.p.rapidapi.com/arrival-estimates.json',
  qs: {
    routes: '4001186',//'4010110',//'',//'4000421%2C4000592%2C4005122', ATM it is the 126
    stops: '4093246',//'4090734',//'',//'4094554',//Lakeside <- //'4094822',//'4002123%2C4023414%2C4021521', THE HUB atm
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

  body = JSON.parse(body);
  console.log(body);
  let arr = body.data[0];
  console.log(body.data);
  console.log(body.data == null);

if((body.data.length) === 0){
  console.log("RTS Bus is currently out of service");
  return;
}else{

  let a = arr.arrivals[0];
  let time = a.arrival_at; //11 characters

  let sTime = time.substring(11, 19);
  let hour = sTime[0] + sTime[1];
  let min = sTime[3] + sTime[4];
  let sec = sTime[6] + sTime[7];

  console.log(hour);
  console.log(min);
  console.log(sec);

  var currTime = new Date();
  let currHr = currTime.getHours();
  let currMin = currTime.getMinutes();
  let currSec = currTime.getSeconds();

  console.log("Current Time:");
  console.log(currHr);
  console.log(currMin);
  console.log(currSec);

  if(currHr > hour){
    hour = parseInt(hour) + 24;
    console.log('\n' + hour);
  }

  let busTotal = (hour * 60) + (parseInt(min)) + (sec/60);
  console.log('\n' + busTotal);
  let usTotal = (currHr * 60) + (currMin) + (currSec/60);
  console.log('\n' + usTotal);

  let ETAinMins = busTotal - usTotal;
  console.log(ETAinMins);

 let finalETAinMins = Math.round(ETAinMins);
 console.log(finalETAinMins);
}

});

//{"rate_limit": 1, "expires_in": 5, "api_latest_version": "1.2", "generated_on": "2020-02-01T13:57:45+00:00", "data": [{"arrivals": [{"route_id": "4001150", "vehicle_id": "4008140", "arrival_at": "2020-02-01T09:07:19-05:00", "type": "vehicle-based"}, {"route_id": "4001150", "vehicle_id": "4012657", "arrival_at": "2020-02-01T09:41:07-05:00", "type": "vehicle-based"}], "agency_id": "116", "stop_id": "4191470"}], "api_version": "1.2"}