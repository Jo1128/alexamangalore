'use strict';

var util = require('util');
var moment = require('moment');
var weather1 = require('weather-js');
const uuid = require('uuid');



//Mongo Params
var mongoose = require('mongoose');
var mongoURL = 'mongodb+srv://jyothi:1234@cluster0-hygoz.mongodb.net/test?retryWrites=true&w=majority';

//Models
var alexaLog = require('../models/alexaLog');
//Mongo DB connect
mongoose.connect(mongoURL, { useNewUrlParser: true }, function (err, connect) {
  if (err) {
    console.log("Mongodb not Connected");
  } else {
    console.log("Mongodb Connected");

  }
});


module.exports = {
  weather
};

function weather(req,res){
var response = {};
response.uid = "urn:uuid:" + uuid.v4();
response.updateDate = new Date();
response.titleText = "Update For Mangalore Weather";


  weather1.find({search: 'Mangalore, KA', degreeType: 'F'}, function(err, result) {
    if(err) {
      response.mainText = "hello from weather. we are facing technical issue right now. please try again sometime";
      response.redirectionUrl = "http://jyothimoily.xyz";
      res.json(response);

      console.log(err);}
    else{

    var day0weather = result[0].forecast[0].skytextday;
    console.log("todays weather " + day0weather);
    var day1weather = result[0].forecast[1].skytextday;
    console.log("tomorrows weather " + day1weather);
    var day2weather = result[0].forecast[2].skytextday;
    console.log("third day weather " + day2weather);
    var day3weather = result[0].forecast[3].skytextday;
    console.log("fourth day weather " + day3weather);
    var day4weather = result[0].forecast[4].skytextday;
    console.log("fifth day weather " + day4weather);
    response.redirectionUrl = "http://jyothimoily.xyz";
    response.mainText = "Hello from weather. Todays weather in Mangalore is expected to be " + day0weather + ".Tomorrows weather will be " +day1weather + ".third day weather will be " + day2weather + " . fourth day weather will be " + day3weather + "fifth day weather will be " + day4weather;
    res.json(response);
    var input="Alexa Whats the weather?";
    var output= response.mainText;
    var timestmp=moment();
    var dd=moment().format("DD");
    var mm=moment().format("MM");
    var yyyy=moment().format("YYYY");
    saveDataInMongo(input, output, timestmp,dd,mm,yyyy)
    }
   
  });
}



function saveDataInMongo(input, output, timestmp,dd,mm,yyyy) {
  var alexaLogObj = new alexaLog({
    input: input,
    output: output,
    timestmp: timestmp,
    dd:dd,
    mm:mm,
    yyyy:yyyy
  });
  alexaLogObj.save(function (error) {
    if (error) {
      console.error("Error in Saving Data->" + error);
    }
    else {
    }
  })
}