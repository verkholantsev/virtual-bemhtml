'use strict';

module.exports = {
    init: init,
    decl: decl
};

function _partial(fn) {
    var appliedArgs = Array.prototype.slice.call(arguments, 1);

    return function () {
        var args = Array.prototype.slice.apply(arguments);
        fn.apply(this, appliedArgs.concat(args));
    };
}

function init(rootElement) {
    var rootElementIsNotInited = (rootElement.getAttribute(DATA_ID_ATTRIBUTE) === null);
    if (rootElementIsNotInited) {
        rootElement.addEventListener('click', _partial(_handleClick, rootElement));
    }

    var stack = [rootElement];
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

var constructors = {
    hello: require('./Hello')
};
var componentCache = {};
var id = 0;
var DATA_ID_ATTRIBUTE = 'data-component-id';

function _initNode(node) {
    if (node.getAttribute(DATA_ID_ATTRIBUTE)) {
        return;
    }

    var currentId = id++;
    node.setAttribute(DATA_ID_ATTRIBUTE, currentId);

    var classNames = node.className.split(' ');
    classNames.forEach(function (className) {
        var Ctor = constructors[className];

        if (Ctor) {
            componentCache[currentId] = new Ctor(node, id);
        }
    });
}

function _handleClick(rootElement, event) {
    var target = event.target;
    var currentNode = target;
    var currentId;
    var currentComponent;
    var result = true;

    while (currentNode !== rootElement) {
        currentId = currentNode.getAttribute(DATA_ID_ATTRIBUTE);
        currentComponent = componentCache[currentId];

        if (currentComponent && currentComponent.onClick) {
            result = currentComponent.onClick(event);
        }

        if (result === false) {
            break;
        }

        currentNode = currentNode.parentNode;
    }
}

function decl() {
}
