#!/usr/bin/env node

/*
** This file creates command-line functionality for the module. It uses
** yargs to create an interface for typing on the command line, and then it retrieves
** the stream of objects from index.js. It then iterates through the stream, printing
** out each repository on a new line.
*/

/* eslint no-console:0 */
/* eslint no-unused-vars:0 */

var mixpanelJQL = require('../index.js');
var yargs = require('yargs');
var fs = require('fs');

var options = yargs.usage('Usage: mixpanel-api-wrapper --key <api_key> --secret <api_secret> --file <queryFile>')
  .option('key', {
    alias: 'k',
    describe: 'api_key'
  })
  .require('key')
  .option('secret', {
    alias: 's',
    describe: 'api_secret'
  })
  .require('secret')
  .option('file', {
    alias: 'f',
    describe: 'file with query'
  })
  .require('file')
  .help('help')
  .alias('help', 'h')
  .argv;

var argv = yargs.argv;

fs.readFile(argv.file, 'utf8', function(err, contents) {
  if (err) {
    console.error(err.message);
    return;
  }
  var query = contents;
  var stream = mixpanelJQL(argv.key, argv.secret, query);
  stream.on('data', function(chunk) {
    console.log(chunk);
  });
  stream.on('end', function(chunk) {
    console.log('All data emitted');
  });
});
