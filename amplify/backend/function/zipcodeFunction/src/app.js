/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const axios = require("axios");
const { getPostalCodeFromQuery } = require("./utils/postalCode");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

//123

app.get("/zipcode", function (req, res) {
  // const googleapiurl = "https://maps.googleapis.com/maps/api/geocode/json";
  // const latLong = req.body.latLong;
  // console.log("LatLong: ", latLong);
  // axios({
  //   method: "get",
  //   url: googleapiurl,
  //   params: {
  //     latlng: latLong,
  //     key: "AIzaSyB-yynHp5qdFEGinU5SOz19WmlCj0IYK2M"
  //   },
  // })
  //   .then((response) => {
  //     let result = response.data;
  //     // console.log("Result : ", result)
  //     if (result.results) {
  //       let zipCode = getPostalCodeFromQuery(result.results);
  //       if (zipCode != "00000") {
  //         res.json({
  //           error: false,
  //           payload: zipCode,
  //         });
  //       } else {
  //         res.json({
  //           error: true,
  //           payload: "Can't find your Zip Code.",
  //         });
  //       }
  //     } else {
  //       res.json({
  //         error: true,
  //         payload: "Can't find your Zip Code.",
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     // console.log("Error: ", err)
  //     res.json({
  //       error: true,
  //       payload: "Can't find your Zip Code.",
  //     });
  //   });

  res.json({ success: "get call succeed!", url: req.url });
});

app.get("/zipcode/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post("/zipcode", function (req, res) {
  // Add your code here

  try {
    console.log("SEVER");
    const googleapiurl = "https://maps.googleapis.com/maps/api/geocode/json";
    axios({
      method: "get",
      url: googleapiurl,
      params: {
        latlng: req.body.latLong,
        // latlng: "33.79340726062406, -84.38471328185885",
        key: "AIzaSyB-yynHp5qdFEGinU5SOz19WmlCj0IYK2M",
      },
    })
      .then((response) => {
        let result = response.data;
        if (result.results) {
          let zipCode = getPostalCodeFromQuery(result.results);
          console.log("zipCode: ", zipCode);
          if (zipCode != "00000") {
            res.json({
              error: false,
              payload: zipCode,
            });
            return (response = {
              error: false,
              payload: zipCode,
            });
          } else {
            res.json({
              error: true,
              payload: result,
              // payload: "Can't find your Zip Code.1",
            });
            return (response = {
              error: true,
              payload: result,
              // payload: "Can't find your Zip Code.2",
            });
          }
        } else {
          res.json({
            error: true,
            payload: result,
            // payload: "Can't find your Zip Code.3",
          });
          return (response = {
            error: true,
            payload: result,
            // payload: "Can't find your Zip Code.4",
          });
        }
      })
      .catch((err) => {
        // console.log("Error: ", err)
        res.json({
          error: true,
          payload: "Can't find your Zip Code.5",
        });
        // return (response = {
        //   error: true,
        //   payload: "Can't find your Zip Code.",
        // });
      });

    // response = {
    //   statusCode: 200,
    //   isBase64Encoded: false,
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     message: ret,
    //     // location: ret.data.trim()
    //   }),
    // };
  } catch (err) {
    console.log(err);
    return err;
  }

  // res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/zipcode/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/zipcode", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/zipcode/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/zipcode", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/zipcode/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3001, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
