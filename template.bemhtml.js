block('hello').content()(function () {
    return ['Hello, ', this.ctx.name, '!'];
});
