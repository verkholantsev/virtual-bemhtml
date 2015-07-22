var fs = require('fs');
var bemxjst = require('bem-xjst');

var iBem = fs.readFileSync('i-bem.bemhtml');
var source = fs.readFileSync('template.bemhtml.js');

fs.writeFileSync('template.js', bemxjst.generate(iBem + '\n;' + source));

