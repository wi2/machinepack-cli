#!/usr/bin/env node

var cli = require('machinepack-cli').prompt().execSync();

cli
.add('-l', 'declare_something_for_help', function(result){})
.prompt('-p', 'declare_what_you_want', function(){});
.add('--long', 'declare_something_for_help', function(result){})
.prompt('--ppp', 'declare_what_you_want', function(){});

.process(function(result){
  cli.notice("The results");
  console.log(result);
});


//USAGE
// $ ./bin/file.js -l -p --ppp
