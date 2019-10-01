// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get('/api/timestamp/:QueryTime?', (req, res, next) => {
  
    if (req.params.QueryTime==undefined){
      req.time = new Date();    
    } else{
      
      req.time = new Date(req.params.QueryTime);

      if(req.time == process.env.ERROR_MESSAGE || req.time == null) {
        req.time = new Date(req.params.QueryTime*1000);
      }
    }
  
  next();
  }, (req, res)=> {
    if(req.time == process.env.ERROR_MESSAGE || req.time == null) {
      res.json({"error":process.env.ERROR_MESSAGE});
    }
    else {
      res.json({"unix": req.time.getTime(),"utc": req.time.toUTCString()});      
    }
  });