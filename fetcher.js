// Created by Nathan Wiles
// Module 2: Week 5 Assignment - Lighthouse Labs

// This program will take a URL and a local file path as command line arguments, then download the resource to the specified path.

// assign variables to required modules
const request = require("request");
const fs = require("fs");

// assign variables to command line arguments
const [url, fileName] = process.argv.slice(2);
const path = `./fetchedData/${fileName}`;


//download the resource from the URL and save it to the specified path
request(url, (error, response, body) => {
  if (error) console.log("request error:", error); // Print the error if one occurred
  if (response.statusCode < 202) {
    console.log(body); // Print the HTML for given URL.
    fs.writeFile(path, body, (err) => {
      if (err) console.log("Write error:", err);
      console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
    });
  }
});
