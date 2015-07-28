/* globals document */
'use strict';

var virtualBemhtml = require('../virtualBemhtml');

var rootElement = document.querySelector('.root');

require('./Hello');

var component = virtualBemhtml.renderComponent(rootElement, {
    block: 'hello',
    name: 'Name',
    redLettersNumber: 4
});

component.update({
    block: 'hello',
    name: 'New name',
    redLettersNumber: 6
});
