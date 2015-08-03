/* globals document */

var Hello = require('./components/Hello');
var Component = require('./components/Component');

document.addEventListener('DOMContentLoaded', function () {
    var rootElement = document.querySelector('.root');

    Component.mount(Hello, rootElement);
});
