#!/usr/bin/env node

var cli = require('../index.js').prompt().execSync();

cli
.add('--plus', 'addition ', function(result){
  cli.warn(result.reduce(function(o,v){return +o + +v}));
})
.add('--less', 'soustract ', function(result){
  cli.warn(result.reduce(function(o,v){return +o - +v}));
})
.prompt('-+', 'addition with prompt')

.process(function(result){
  cli.warn(result['--less']);

  if (result.length)
    cli.notice(result.reduce(function(o,v){return +o + +v}));
});



