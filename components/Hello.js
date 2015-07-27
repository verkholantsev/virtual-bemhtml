'use strict';

var inherits = require('util').inherits;
var Component = require('./Component');

function Hello() {
    Component.apply(this, arguments);
}

inherits(Hello, Component);

Hello.prototype.onClick = function () {
    console.log('hello click', this.node);
};

module.exports = Hello;
