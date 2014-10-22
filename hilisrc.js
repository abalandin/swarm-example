var hili = require('highlight.js');
var fs = require('fs');

//console.log(hili.listLanguages());

var file = process.argv[2];

var src = fs.readFileSync(file).toString();

//console.log(src);

var html = hili.highlight('javascript', src);

console.log('<html><head><link rel="stylesheet" href="/node_modules/highlight.js/styles/xcode.css"></link></head>');
console.log('<body style="white-space: pre; font-family: monospace; width: 800pt; margin: auto; font-size: 12pt">');
console.log(html.value);
console.log('</body></html>');
