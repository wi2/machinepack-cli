var helper = require('./helper.js');
module.exports = function(opts) {
  var options = opts||{}
  , list = []
  , result = []
  , args = process.argv.slice(2)
  , arr = helper.parse(args)

  , init = function() {
  	process.stdin.setEncoding('utf8');
	  process.stdin.on('data', function(data) {
	    cli.debug(data);
	    result.push(data);
	    processing(data);
	  });
    process.on('SIGINT', function () {
      cli.error('Got a SIGINT. Goodbye cruel world');
      process.exit(0);
    });

	  //Add default
	  cli
    .add('--help', 'HELP', function() { helper.help(cli, list) })
	  .add('--generate', 'GENERATE', function(name) { helper.generate(name[0]); });
  }

	, addToList = function(method, shortcut, help, cb){
		if(!shortcut || !method) return;
    list[shortcut] = {help: help||''};
    list[shortcut][method] = function(data){
      if (cb) cb(data);
      process.stdin.resume();
    }
	}

	, processing = function(){
		if (arr[0] && arr[0][0] !== "-") {
      cli.debug("=>", args, arr);
      try {
        var subcli = require( helper.getBinPath(args[0]) );
        list = list.concat(subcli.getList());
      } catch(err) {
        cli.error(err);
      }
    }
    var method, key = arr.shift();
    if (!key) {
      callback(result);
      process.exit(0);
    }
    cli.debug("Call: ["+ key + "] ");
    if (list[key] && list[key] !== undefined) {
        var method = helper.play(key, list, null);
        if (method !== 'prompt') processing();
    } else {
      var tmp = key.split(" ");
      if (tmp[1] && list[tmp[0]] && list[tmp[0]] !== undefined) {
        result[tmp[0]] = tmp.slice(1);
        var method = helper.play(tmp[0], list, result[tmp[0]]);
        if (method !== 'prompt') processing();
      } else if (tmp[0][0] !== "-") {
        processing();
      }
    }
	};

	var cli = {
		add: function(shortcut, help, cb) {
      addToList('do', shortcut, help, cb)
      return this;
    },
    prompt: function(shortcut, help, cb) {
      addToList('prompt', shortcut, help, cb)
      return this;
    },
    process: function(cb) {
      callback = cb;
      processing();
    },
    getList: function() {
      return list;
    },

    //console.log
    error: function(val) {
      helper.consoler(val, 'red');
      return this;
    },
    warn: function(val) {
      helper.consoler(val, 'yellow');
      return this;
    },
    notice: function(val) {
      helper.consoler(val, 'blue');
      return this;
    },
    debug: function(val) {
      if (options.debug) helper.debug(val);
      return this;
    }
	};

	//init
	init();

  return cli;

};
