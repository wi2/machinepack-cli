#!/usr/bin/env node

require('../index.js').prompt()
.execSync()
.add('', '')
.process(function(result){return result;});
