'use strict';

var alt = require('../alt');
var HelloActions = require('../actions/HelloActions');

function HelloStore () {
    this.redLettersNumber = 0;

    this.bindListeners({
        handleChangeRedLettersNumber: HelloActions.CHANGE_RED_LETTERS_NUMBER,
        handleChangeName: HelloActions.CHANGE_NAME
    });
}

HelloStore.prototype.handleChangeRedLettersNumber = function (redLettersNumber) {
    this.redLettersNumber = redLettersNumber;
};

HelloStore.prototype.handleChangeName = function (name) {
    this.name = name;
};


module.exports = alt.createStore(HelloStore, 'HelloStore');
