block('button').tag()('button');

block('button').js()({
    hovered: false
});

block('button').def()(function () {
    var ctx = this.ctx;
    var js = ctx.js || {};

    ctx.mods = this.extend({
        hovered: js.hovered === true ? 'yes' : ''
    }, ctx.mods);

    return applyNext(this.ctx);
});
