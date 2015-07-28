'use strict';

var BEMHTML = require('./template');
var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');
var convertHTML = require('html-to-vdom')({
    VNode: VNode,
    VText: VText
});
var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');

module.exports = {
    decl: decl,
    renderComponent: renderComponent
};

var Constructors = {};
function decl(blockName, Constructor) {
    Constructors[blockName] = Constructor;
}

function renderComponent(rootNode, bemjson) {
    var html = BEMHTML.apply(bemjson);
    var currentVTree = convertHTML(html);
    var renderedElement = createElement(currentVTree);
    rootNode.appendChild(renderedElement);
    _initComponent(renderedElement);

    return {
        update: update
    };

    function update(bemjson) {
        var newHtml = BEMHTML.apply(bemjson);
        var newVTree = convertHTML(newHtml);
        var patches = diff(currentVTree, newVTree);
        patch(renderedElement, patches);

        currentVTree = newVTree;
    }
}

var componentCache = {};
var id = 0;
var DATA_ID_ATTRIBUTE = 'data-component-id';

var EVENTS = ['click'];

function _initComponent(node) {
    var rootElementIsNotInited = (node.getAttribute(DATA_ID_ATTRIBUTE) === null);
    if (rootElementIsNotInited) {
        EVENTS.forEach(function (eventName) {
            node.addEventListener(eventName, function (event) {
                _handleEvent(node, eventName, event);
            });
        });
    }

    var stack = [node];
    var currentNode;

    while (stack.length > 0) {
        currentNode = stack.pop();

        _initNode(currentNode);

        var children = currentNode.children;
        var childrenLength = children.length;
        for (var i = childrenLength - 1; i >= 0; i--) {
            stack.push(children[i]);
        }
    }
}

function _initNode(node) {
    if (node.getAttribute(DATA_ID_ATTRIBUTE)) {
        return;
    }

    var currentId = id++;
    node.setAttribute(DATA_ID_ATTRIBUTE, currentId);

    var classNames = node.className.split(' ');
    classNames.forEach(function (className) {
        var Constructor = Constructors[className];

        if (Constructor) {
            componentCache[currentId] = new Constructor(node, id);
        }
    });
}

function _handleEvent(node, eventName, event) {
    var handlerName = _getHandlerName(eventName);
    var target = event.target;
    var currentNode = target;
    var currentId;
    var currentComponent;
    var result = true;

    while (currentNode !== node) {
        currentId = currentNode.getAttribute(DATA_ID_ATTRIBUTE);
        currentComponent = componentCache[currentId];

        if (currentComponent && currentComponent[handlerName]) {
            result = currentComponent[handlerName](event);
        }

        if (result === false) {
            break;
        }

        currentNode = currentNode.parentNode;
    }
}

function _getHandlerName(eventName) {
    return 'on' + eventName[0].toUpperCase() + eventName.slice(1);
}
