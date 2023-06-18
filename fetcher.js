// Created by Nathan Wiles
// Module 2: Week 5 Assignment - Lighthouse Labs

// This program will take a URL and a local file path as command line arguments, then download the resource to the specified path.

// assign variables to required modules 
const request = require('request');
const fs =require('fs');

// assign variables to command line arguments
const [ url, path ]  = process.argv.slice(2);
console.log(url, path);




 