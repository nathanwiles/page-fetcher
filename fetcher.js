// Created by Nathan Wiles
// Module 2: Week 5 Assignment - Lighthouse Labs

// This program will take a URL and a local file path as command line arguments, then download the resource to the specified path.

// Assign variables to required modules
const request = require("request");
const fs = require("fs");
const readline = require("readline");

// Assign variables to command line arguments
const [url, path] = process.argv.slice(2);

// request to download the resource from the URL and save it to the specified path

request(url, (error, response, body) => {
  if (error) {
    // Print error  and exit if one occurred
    console.log("URL Not Found:", error.hostname);
    process.exit();
  }

  // Print the response status code if a response was received
  if (response.statusCode) {
    console.log("\nStatus:", `${response.statusCode}:`, response.statusMessage);
  }

  // check that response is OK before writing file
  if (response.statusCode === 200) {
    // initialize readline interface to prompt user for overwrite confirmation
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // check if file path already exists
    fs.access(path, fs.constants.F_OK, (err) => {
      rl.question(
        "File path already exists. Are you sure you want to overwrite? 'Y/N\n",
        (answer) => {
          if (answer === "N") {
            console.log("File not overwritten.");
            process.exit();
          } else if (answer === "Y") {
            // console.log confirmation messages
            console.log("File will be overwritten.");
            console.log(`Writing file to: ${path}`);
            // write the file
            fs.writeFile(path, body, (err) => {
              if (err) {
                // print error and exit if one occurred
                console.log("File path not found:", path);
                process.exit();
              } else {
                // print success message and exit
                console.log(
                  `Downloaded and saved ${body.length} bytes to: ${path}\n`
                );
                process.exit();
              }
            });
          } else {
            // print error and exit if invalid input
            console.log("Invalid input.");
            process.exit();
          }

          rl.close(); // close readline interface
        }
      );
    });
  }
});
