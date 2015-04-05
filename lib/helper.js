module.exports = {
  parse: function(arr) {
    return arr.reduce(function(o, v, i){
      if (v[0]==="-" && v[1]!=="-" && v.length>2){
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
    var fs = require('fs-extra');
    fs.copySync(require('path').resolve(__dirname,'../templates/cli.js'), 'bin/'+name+'.js');
  },
  consoler: function(){
    var args = Array.prototype.slice.call(arguments);
    var color = args.pop();
    for(i in args)
      console.log(require('cli-color')[color](args[i]));
  }
};
