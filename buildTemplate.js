var fs = require('fs');
var bemxjst = require('bem-xjst');
var glob = require('glob');

glob('./components/*.bemhtml.js', {},  function (err, files) {
    var source = files.map(function (filename) {
        return fs.readFileSync(filename);
    }).join('\n;');

    fs.writeFileSync('template.js', bemxjst.generate(source));
});
