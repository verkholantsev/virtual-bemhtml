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

document.addEventListener('DOMContentLoaded', function () {
    var addElementButton = document.querySelector('.add-element');
    addElementButton.addEventListener('click', handleAddElement);

    var incrementIndexButton = document.querySelector('.increment-start-index');
    incrementIndexButton.addEventListener('click', handleIncrementIndex);

    var decrementIndexButton = document.querySelector('.decrement-start-index');
    decrementIndexButton.addEventListener('click', handleDecrementIndex);

    rootElement = document.querySelector('.root');
    currentVtree = convertHTML(rootElement.innerHTML);
});

var state = {
    length: 0,
    startIndex: 0
};

function handleAddElement() {
    state.length++;
    render();
}

function handleIncrementIndex() {
    state.startIndex++;
    render();
}

function handleDecrementIndex() {
    state.startIndex--;
    render();
}

function render() {
    var bemjson = Array.apply(null, {length: state.length})
        .map(function (_, index) {
            return {
                block: 'hello',
                name: index + state.startIndex
            };
        });

    var html = BEMHTML.apply({block: 'root', content: bemjson});
    var newVtree = convertHTML(html);
    var patches = diff(currentVtree, newVtree);
    patch(rootElement, patches);

    rootElement = document.querySelector('.root');
    currentVtree = newVtree;

}
