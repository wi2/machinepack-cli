var helper = require('./helper.js');
module.exports = function(opts) {
  var options = opts||{}
  , list = []
  , result = []
  , arr = helper.parse(process.argv.slice(2))

  , init = function() {
  	process.stdin.setEncoding('utf8');
	  process.stdin.on('data', function(data) {
	    cli.debug(data);
	    result.push(data);
	    processing(data);
	  });

	  //Add default
	  cli.add('--help', 'HELP', help);
	  cli.add('--generate', 'GENERATE', generate);
  }

  , generate = function(name) { helper.generate(name[0]); }
  , consoler = helper.consoler
  , help = function() { helper.help(cli, list) }

	, addToList = function(method, shortcut, help, cb){
		if(!shortcut || !method) return;
    list[shortcut] = {help: help||''};
    list[shortcut][method] = function(data){
      if (cb) cb(data);
      process.stdin.resume();
    }
	}

	, getMethod = function(key){
    var method;
    if( list[key].hasOwnProperty('do') )
      method = 'do';
    else if( list[key].hasOwnProperty('prompt') )
      method = 'prompt';
    if (!method) return;
    return method;
  }

	, processing = function(){
		var method, key = arr.shift();
    if (!key) {
      callback(result);
      process.exit(0);
    }
    cli.debug("Call: ["+ key + "] ");
    if (list[key] && list[key] !== undefined) {
    		method = getMethod(key);
        cli.notice(list[key].help);
        list[key][method]();
        if (method !== 'prompt') processing();
    } else {
      var tmp = key.split(" ");
      if (tmp[1] && list[tmp[0]] && list[tmp[0]] !== undefined) {
        method = getMethod(tmp[0]);
        cli.notice(list[tmp[0]].help);
        list[tmp[0]][method](tmp.slice(1));
        if (method !== 'prompt') processing();
      }
    }
	};

	var cli = {
		add: function(shortcut, help, cb) {
      addToList('do', shortcut, help, cb)
      return this;
    },
    prompt: function(shortcut, help, cb) {
      addToList('prompt', shortcut, help, null)
      return this;
    },
    process: function(cb) {
      callback = cb;
      processing();
    },
    //console
    error: function(val) {
      consoler(val, 'red');
      return this;
    },
    warn: function(val) {
      consoler(val, 'yellow');
      return this;
    },
    notice: function(val) {
      consoler(val, 'blue');
      return this;
    },
    debug: function(val) {
      if (options.debug) {
        consoler("DEBUG", 'green');
        consoler(val, 'green');
      }
      return this;
    }
	};

	//init
	init();

  return cli;

};
