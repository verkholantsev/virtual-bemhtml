'use strict';

var inherits = require('util').inherits;
var Component = require('./Component');
var virtualBemhtml = require('../virtualBemhtml');

function Hello() {
    Component.apply(this, arguments);
}

inherits(Hello, Component);

Hello.prototype.onClick = function () {
    console.log('hello click', this.node);
};

virtualBemhtml.decl('hello', Hello);
