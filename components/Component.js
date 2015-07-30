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

function Component(id) {
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

        return void patch(node, patches);
    }


    node = createElement(newVTree);

    this.node = node;
};

Component.prototype.appendTo = function (parentNode) {
    var node = this.node;
    parentNode.appendChild(node);

    this.componentDidMount();
};

Component.prototype.componentDidMount = function () {
};

module.exports = Component;
