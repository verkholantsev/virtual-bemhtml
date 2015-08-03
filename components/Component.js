'use strict';

var STATE_ATTRIBUTE_NAME = 'data-bem';

var createElement = require('virtual-dom/create-element');
var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');
var convertHTML = require('html-to-vdom')({
    VNode: VNode,
    VText: VText
});
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var BEMHTML = require('../template');
var assign = require('lodash/object/assign');

var inherits = require('util').inherits;

function Component(node, id) {
    this.node = node || null;
}

Component.prototype.getState = function () {
    var node = this.node;
    var blockName = this.getBlockName();
    var serializedState = node.getAttribute(STATE_ATTRIBUTE_NAME).replace(/&quot;/g, '"');
    var currentState = JSON.parse(serializedState)[blockName];

    return currentState;
};

Component.prototype.setState = function (state) {
    var node = this.node;
    var currentState = this.getState();
    var newState = assign({}, currentState, state);
    var blockName = this.getBlockName();

    this.render({
        block: blockName,
        js: newState
    });
};

Component.prototype.getBlockName = function () {
    return this.blockName;
};

Component.prototype.render = function (bemjson) {
    var blockName = this.getBlockName();

    bemjson = bemjson || {
        block: blockName,
        js: {}
    };

    var node = this.node;
    var newHtml = BEMHTML.apply(bemjson);
    var newVTree = convertHTML(newHtml);
    var currentVTree = this.vTree;

    this.vTree = newVTree;

    if (node) {
        var patches = diff(currentVTree, newVTree);

        patch(node, patches);
    } else {
        node = createElement(newVTree);
        this.node = node;

        var currentId = id++;
        node.setAttribute(DATA_ID_ATTRIBUTE, currentId);
        componentCache[currentId] = this;
        this.componentDidMount();
    }

    _initComponents(node);
};

Component.prototype.appendTo = function (parentNode) {
    var node = this.node;
    parentNode.appendChild(node);
};

Component.prototype.componentDidMount = function () {};

Component.decl = function (blockName, Constructor, BaseConstructor) {
    inherits(Constructor, BaseConstructor);
    Constructor.prototype.blockName = blockName;
    Constructors[blockName] = Constructor;
};

Component.mount = function (Constructor, parentNode) {
    var currentId = id++;
    var instance = new Constructor(null, id);
    instance.render();
    instance.appendTo(parentNode);
};

var Constructors = {};
var componentCache = {};
var id = 0;
var DATA_ID_ATTRIBUTE = 'data-component-id';

function _initComponents(node) {
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
            var instance = new Constructor(node, id);
            componentCache[currentId] = instance;
            instance.componentDidMount();
        }
    });
}

module.exports = Component;
