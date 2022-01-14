
const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/",function(req,res){


  const apiKey = '86ececb6c648b842ab649ba150c0cff3';
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temprature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

      console.log(description);
      console.log(temprature);


      res.write("<p>the weather is "+ description + "</p>");
      res.write("<h1>the temprature in "+query+" is "+temprature+" deg Celcius"+" </h1>");
      res.write("<img src='"+imgUrl+"' >");
      res.send();
    });
  })
})



















app.listen(3000,function(){
  console.log('server is running on port 3000');
})
