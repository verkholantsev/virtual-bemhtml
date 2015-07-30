/* globals document */

var Hello = require('./components/Hello');

document.addEventListener('DOMContentLoaded', function () {
    var hello = new Hello();
    var rootElement = document.querySelector('.root');

    hello.render();
    hello.appendTo(rootElement);
});
