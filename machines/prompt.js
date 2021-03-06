module.exports = {

  friendlyName: 'Prompt',
  description: 'Simple prompt',
  extendedDescription: "See https://github.com/wi2/machinepack-cli/blob/master/README.md",

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
