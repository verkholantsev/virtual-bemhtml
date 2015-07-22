var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var BEMHTML = require('./template');

var convertHTML = require('html-to-vdom')({
    VNode: VNode,
    VText: VText
});

var currentVtree;
var rootElement;

function render() {
    var bemjson = Array.apply(null, {length: state.length})
        .map(function (_, index) {
            return {
                block: 'hello',
                name: String(index + state.startIndex),
                redLettersNumber: state.redLettersNumber
            };
        });

    var html = BEMHTML.apply({block: 'root', content: bemjson});
    var newVtree = convertHTML(html);
    var patches = diff(currentVtree, newVtree);
    patch(rootElement, patches);

    rootElement = document.querySelector('.root');
    currentVtree = newVtree;

}

function renderDecorator(fn) {
    return function () {
        var result = fn.apply(this, arguments);
        render();
        return result;
    };
}

var state = {
    length: 0,
    startIndex: 0,
    redLettersNumber: 0
};

var handleAddElement = renderDecorator(function () {
    state.length++;
});

var handleIncrementIndex = renderDecorator(function () {
    state.startIndex++;
});

var handleDecrementIndex = renderDecorator(function () {
    state.startIndex--;
});

var handleIncrementRedLetttersNumber = renderDecorator(function () {
    state.redLettersNumber++;
});

var handleDecrementRedLetttersNumber = renderDecorator(function () {
    state.redLettersNumber--;
});

document.addEventListener('DOMContentLoaded', function () {
    onClick('.add-element', handleAddElement);
    onClick('.increment-start-index', handleIncrementIndex);
    onClick('.decrement-start-index', handleDecrementIndex);
    onClick('.increment-red-letters-number', handleIncrementRedLetttersNumber);
    onClick('.decrement-red-letters-number', handleDecrementRedLetttersNumber);

    rootElement = document.querySelector('.root');
    currentVtree = convertHTML(rootElement.innerHTML);
});

function onClick(selector, handler) {
    var node = document.querySelector(selector);
    node.addEventListener('click', handler);
}
