#!/usr/bin/env node

var cli = require('machinepack-cli').prompt().execSync();

cli
.add('-helloworld', 'Hello the world!', function(result){})
.prompt('-hello', 'what is your name?', function(){})

.process(function(result){
  cli.result("Hello " + result["-hello"] + "!");

  cli.notice("The results");
  console.log(result);
});


//USAGE
// $ ./bin/file.js -l -p --ppp
