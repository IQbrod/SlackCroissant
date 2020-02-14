const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');

const constants = require('./constants/secret.js');

// Define server and port
const app = express();
const port = 3200;

//HTTP Request body parser
app.use(bodyparser.urlencoded({extended: false}));

// Define routes used by the server
app.get('/', function (req, res) {

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + constants.API_TOKEN
    }
    
    var newPost = {
      url: "https://slack.com/api/chat.postMessage",
      method: 'POST',
      headers: headers,
      json: true,
      body: {
          text: req.query.text,
          channel: constants.SLACK_CHANNEL_ID
      }
    }
  
    request(newPost, (error, response, body) => {
        res.sendStatus(response.statusCode);
    })
  })

// Start server
app.listen(port, _ => console.info("Server listening port " + port + " ..."));