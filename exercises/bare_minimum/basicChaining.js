/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var getGitHub = require('./promisification');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(readFilePath, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        var username = data.split('\n')[0];
        resolve(username);
      }
    });
  }).then(function(username) {
    return getGitHub.getGitHubProfileAsync(username);
  }).then(function(profile) {
    fs.writeFile(writeFilePath, JSON.stringify(profile), function(err) {
      console.log('file written');
    });
  })
  .catch(function(err) {
    console.log('Error:', err);
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
