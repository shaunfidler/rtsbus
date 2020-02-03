var jsonRouteID = {"entries":[{"short_name":"600","route_id":"4012442"},{"short_name":"601","route_id":"4012444"},{"short_name":"602","route_id":"4013338"},{"short_name":"1","route_id":"4001150"},{"short_name":"10","route_id":"4001154"},{"short_name":"11","route_id":"4001158"},{"short_name":"117","route_id":"4001162"},{"short_name":"119","route_id":"4001166"},{"short_name":"12","route_id":"4001170"},{"short_name":"120","route_id":"4001174"},{"short_name":"122","route_id":"4001178"},{"short_name":"125","route_id":"4001182"},{"short_name":"126","route_id":"4001186"},{"short_name":"127","route_id":"4001190"},{"short_name":"13","route_id":"4001194"},{"short_name":"15","route_id":"4001198"},{"short_name":"16","route_id":"4001202"},{"short_name":"17","route_id":"4001206"},{"short_name":"20","route_id":"4001214"},{"short_name":"23","route_id":"4001222"},{"short_name":"25","route_id":"4001230"},{"short_name":"34","route_id":"4001234"},{"short_name":"35","route_id":"4001238"},{"short_name":"38","route_id":"4001246"},{"short_name":"43","route_id":"4001274"},{"short_name":"5","route_id":"4001278"},{"short_name":"6","route_id":"4001282"},{"short_name":"7","route_id":"4001286"},{"short_name":"75","route_id":"4001290"},{"short_name":"8","route_id":"4001294"},{"short_name":"9","route_id":"4001298"},{"short_name":"A","route_id":"4001302"},{"short_name":"B","route_id":"4001306"},{"short_name":"C","route_id":"4001310"},{"short_name":"46","route_id":"4001778"},{"short_name":"2","route_id":"4004578"},{"short_name":"3","route_id":"4004582"},{"short_name":"26","route_id":"4004590"},{"short_name":"24","route_id":"4004594"},{"short_name":"128","route_id":"4004598"},{"short_name":"711","route_id":"4006856"},{"short_name":"28","route_id":"4008378"},{"short_name":"121","route_id":"4008422"},{"short_name":"29","route_id":"4008424"},{"short_name":"40","route_id":"4008426"},{"short_name":"19","route_id":"4008428"},{"short_name":"27","route_id":"4008430"},{"short_name":"37","route_id":"4008432"},{"short_name":"39","route_id":"4008442"},{"short_name":"76","route_id":"4008444"},{"short_name":"62","route_id":"4008446"},{"short_name":"77","route_id":"4008448"},{"short_name":"36","route_id":"4008450"},{"short_name":"118","route_id":"4008452"},{"short_name":"D","route_id":"4008454"},{"short_name":"F","route_id":"4008456"},{"short_name":"33","route_id":"4010110"},{"short_name":"21","route_id":"4010112"},{"short_name":"800","route_id":"4011454"},{"short_name":"150","route_id":"4013340"}]};

const functions = require('firebase-functions');
const {dialogflow} = require('actions-on-google');
const {WebhookClient} = ('dialogflow-fulfillment');
const request = require('request');
const response = require('response');



const WELCOME_INTENT ='Default Welcome Intent';
const FALLBACK_INTENT = 'Default Fallback Intent';
const FAR_FROM_HOME = 'farfromhome';

const app = dialogflow();

app.intent(WELCOME_INTENT, (conv) => {
  conv.ask("Welcome");
});

app.intent(FALLBACK_INTENT, (conv) => {
  conv.ask("I didn't hear that correctly. Try again.");
});

app.intent(FAR_FROM_HOME, (conv) => {

  var rID;// = '4010110';
  var hID;// = '4091314';


  
  const busNum = conv.parameters.number;
       //conv.ask(busNum);

  let json = jsonRouteID;//JSON.parse(jsonRouteID);
  let d = json.entries;

  d.forEach(element => {
    if(element.short_name == busNum){
      rID = element.route_id; //Route ID from bus selected
      hID = '4093246'; //--Newell NB //'4091314';//'4090734'; //BB //4094822; //The HUB - Eastbound Stadium RD @ Nearside Buckman DR
      //conv.ask("Bus #" + element.short_name + " is " + element.route_id);
    }
     //console.log(element.short_name + ' , ' + element.route_id);
  });   
  
  //Arrival Time Calc.
  var options2 = {
    method: 'GET',
    url: 'https://transloc-api-1-2.p.rapidapi.com/arrival-estimates.json',
    qs: {
      callback: 'call',
      agencies: '116',
      routes: rID,
      stops: hID
    },
    headers: {
      'x-rapidapi-host': 'transloc-api-1-2.p.rapidapi.com',
      'x-rapidapi-key': '93a51b9988mshbaae07e32b41a78p1f7147jsna57f0fd7145a'
    }
  };


return new Promise(function(resolve, reject) {
    request(options2, function (error, response, body) {
      if (error) reject(error);
      body = JSON.parse(body);
      let arr = body.data[0];
      if((body.data.length) == 0){
  		conv.ask("RTS Bus is currently out of service");
	  }else{
      
      let a = arr.arrivals[0];
      let time = a.arrival_at; //11 characters
      //conv.ask(time);

      let sTime = time.substring(11, 19);
      let hour = sTime[0] + sTime[1];
      let min = sTime[3] + sTime[4];
      let sec = sTime[6] + sTime[7];
        
      let hourN = Number(hour);
      let minN = Number(min);
      let secN = Number(sec);
        

      // console.log(hour);
      // console.log(min);
      // console.log(sec);

      var currTime = new Date();
      let currHr = currTime.getHours();
        currHr = currHr - 5;
        
      if(currHr < 0){
        currHr = currHr + 24;
      }
      let currMin = currTime.getMinutes();
      let currSec = currTime.getSeconds();

      // console.log("Current Time:");
      // console.log(currHr);
      // console.log(currMin);
      // console.log(currSec);

      if(currHr > hourN){
        //conv.ask((hour));
        hourN = hourN + 24;
        
        
        //console.log('\n' + hour);
      }

      let busTotal = (hourN * 60) + (minN);// + (parseInt(sec)/60);
      //conv.ask(busTotal.toString());
      //console.log('\n' + busTotal);
      let usTotal = (currHr * 60) + (currMin);// + (currSec/60);
      //console.log('\n' + usTotal);
      //conv.ask(currHr.toString());

      let ETAinMins = busTotal - usTotal;
      //console.log(ETAinMins);

     //let finalETAinMins = Math.round(ETAinMins);
     //console.log(finalETAinMins);
     
      conv.ask(`The estimated time of arrival is ${ETAinMins} minutes`);
      
      }
      resolve(); 	
    });    
    
});
  
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);