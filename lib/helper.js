var fs = require('fs-extra')
  , path = require('path');

module.exports = {
  parse: function(arr) {
    if (!arr.length) arr = ["--help"];

    return arr.reduce(function(o, v, i){
      if (o[0] !== "-" && i === 1) {
        return [o,v];
      } else if (v[0]==="-" && v[1]!=="-" && v.length>2){
        v = v.split("").join(" -").replace("- -", "-");
      }
      return o + (v[0]==="-" ? ",":" ") + v;
    }).split(",");
  },
  help: function(cli, list) {
    cli
    .warn("========")
    .warn("+ HELP +")
    .warn("========")
    .notice("Options & Params")
    .notice("----------------");
    for(item in list)
      if (item !== '--help')
        this.consoler(item + ": " + list[item].help, 'green');
  },
  generate: function(name) {
    console.log("Generate file: ", "bin/"+name+".js");
    fs.copySync(path.resolve(__dirname,'../templates/cli.js'), 'bin/'+name+'.js');
  },
  play: function(key, list, val) {
    method = this.getMethod(key, list);
    this.consoler(list[key].help, "blue");
    list[key][method](val);
    return method;
  },
  getMethod: function(key, list){
    var method;
    if( list[key].hasOwnProperty('do') )
      method = 'do';
    else if( list[key].hasOwnProperty('prompt') )
      method = 'prompt';
    if (!method) return;
    return method;
  },
  getBinPath: function(file){
    return path.resolve(process.cwd(), 'bin', file+".js");
  },
  debug: function(val) {
    this.consoler("DEBUG", 'green');
    this.consoler(val, 'green');
  },
  consoler: function(){
    var args = Array.prototype.slice.call(arguments);
    var color = args.pop();
    for(i in args)
      console.log(require('cli-color')[color](args[i]));
  }
};
