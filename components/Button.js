'use strict';

var Component = require('./Component');

function Button() {
    Component.apply(this, arguments);
}

Component.decl('button', Button, Component);

Button.prototype.componentDidMount = function () {
    var node = this.node;

    node.addEventListener('mouseover', this.onMouseOver.bind(this));
};

Button.prototype.onMouseOver = function () {
    this.setState({hovered: true});
};

Button.prototype.onMouseOut = function () {
    this.setState({hovered: false});
};
