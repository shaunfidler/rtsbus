const functions = require('firebase-functions');
const {dialogflow} = require('actions-on-google');
const {WebhookClient} = ('dialogflow-fulfillment');
const request = require('request');
const response = require('response');
const axios = require('axios');
const isDST = require('isdst').isDST;

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
  
  const busNum = conv.parameters.number;
  console.log("Looking for bus #" + busNum)

  return new Promise( function(resolve, reject){
  axios({
    "method":"GET",
    "url":"https://transloc-api-1-2.p.rapidapi.com/routes.json",
    "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"transloc-api-1-2.p.rapidapi.com",
        "x-rapidapi-key":"93a51b9988mshbaae07e32b41a78p1f7147jsna57f0fd7145a"
    },"params":{
        "callback":"call",
        "agencies":"116"
    }
})
.then((res) => {
    let routes = res.data.data[116];
    let rID;

    routes.forEach((element) => {
        if(element.short_name === busNum){
            rID = element.route_id;
        }
    })
    let hID = '4093246';

    axios({
        "method":"GET",
        "url":"https://transloc-api-1-2.p.rapidapi.com/arrival-estimates.json",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"transloc-api-1-2.p.rapidapi.com",
        "x-rapidapi-key":"93a51b9988mshbaae07e32b41a78p1f7147jsna57f0fd7145a"
        },"params":{
        "callback":"call",
        "agencies":"116",
        "routes": rID,
        "stops": hID
        }
        })
        .then((res)=>{
            if(res.data.data === undefined || res.data.data.length === 0){
                console.log("RTS Bus is currently out of service");
                conv.ask("RTS Bus is currently out of service");
                resolve();
            }else{
                let arr = res.data.data[0];
                let a = arr.arrivals[0];
                let time = a.arrival_at; //11 characters
                console.log(time)

                let sTime = time.substring(11, 19);
                let hour = sTime[0] + sTime[1];
                let min = sTime[3] + sTime[4];
                let sec = sTime[6] + sTime[7];
                    
                let hourN = Number(hour);
                let minN = Number(min);
                let secN = Number(sec);

                var currTime = new Date();
                let offset = 0;
                if(isDST(currTime)){
                    offset = 4;
                }else{
                    offset = 5;
                }

                console.log("CurrTime: " + currTime);
                console.log("Offset: " + offset);
                let currHr = currTime.getHours() - offset;
                let currMin = currTime.getMinutes();
                let currSec = currTime.getSeconds();

                if(currHr > hourN){
                    hourN = hourN + 24;
                }

                let busTotal = (hourN * 60) + (minN);
                let usTotal = (currHr * 60) + (currMin);

                console.log("BUS: " + busTotal + " US: " + usTotal)

                let ETAinMins = busTotal - usTotal;
                console.log(`The estimated time of arrival is ${ETAinMins} minutes`)
                conv.ask(`The estimated time of arrival is ${ETAinMins} minutes`);
                resolve();
            }
            return null;
            
        })
        .catch((err)=>{
            console.log(err);
        })
        return null;
    })
    .catch((err)=>{
        console.log(err);
    })
  })

});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
