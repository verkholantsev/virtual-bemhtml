'use strict';

var alt = require('../alt');

var HelloActions = function () {};

HelloActions.prototype.changeRedLettersNumber = function (redLettersCount) {
    this.dispatch(redLettersCount);
};

HelloActions.prototype.changeName = function (name) {
    this.dispatch(name);
};

module.exports = alt.createActions(HelloActions);
