module.exports = {

  friendlyName: 'Prompt',
  description: 'Simple prompt',
  extendedDescription: " ## Install "
+ " ``` "
+ " $ npm install -g machinepack-cli "
+ " ``` "
+ " (with sudo if error)"
+ "  "
+ " ## Usage "
+ " ``` "
+ " $ cli --help"
+ " $ cli --generate file "
+ " ``` "
+ " Generate a file in bin folder "
+ " ``` "
+ " $ cli file --hello "
+ " $ cli file --help "
+ " ``` ",

  sync: true,

  inputs: {
    debug: {
      example: true,
      description: 'debug mode',
      required: false
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.',
    },
    success: {
      description: 'Done.',
    },
  },

  fn: function (inputs,exits) {
    return exits.success(require('../lib/cli.js')(inputs));
  },

};
