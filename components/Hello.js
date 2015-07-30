'use strict';

var inherits = require('util').inherits;
var Component = require('./Component');
var virtualBemhtml = require('../virtualBemhtml');

var HelloStore = require('../stores/HelloStore');
var HelloActions = require('../actions/HelloActions');

function Hello() {
    Component.apply(this, arguments);
}

inherits(Hello, Component);

Hello.prototype.blockName = 'hello';

Hello.prototype.componentDidMount = function () {
    var node = this.node;

    HelloStore.listen(this.onChange.bind(this));

    node
        .querySelector('.hello__increment-button')
        .addEventListener('click', this.onClick.bind(this, 1));

    node
        .querySelector('.hello__decrement-button')
        .addEventListener('click', this.onClick.bind(this, -1));

    node
        .querySelector('.hello__name-input')
        .addEventListener('keyup', this.onInputKeyUp.bind(this));
};

Hello.prototype.onChange = function (state) {
    this.setState(state);
};

Hello.prototype.onInputKeyUp = function () {
    var node = this.node;
    var inputNode = node.querySelector('.hello__name-input');
    var inputValue = inputNode.value;

    HelloActions.changeName(inputValue);
};

Hello.prototype.onClick = function (summand) {
    var state = this.getState();
    var redLettersNumber = state.redLettersNumber || 0;
    HelloActions.changeRedLettersNumber(redLettersNumber + summand);
};

module.exports = Hello;
