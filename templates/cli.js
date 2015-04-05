#!/usr/bin/env node

require('machinepack-cli').prompt().execSync()
.add('-l', 'declare_something_for_help', function(result){})
.prompt('-l', 'declare_what_you_want', function(result){})


process.on('SIGINT', function () {
  cli.error('Got a SIGINT. Goodbye cruel world');
  process.exit(0);
});


