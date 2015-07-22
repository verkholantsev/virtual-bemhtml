block('hello').content()(function () {
    var name = this.ctx.name;
    var redLettersNumber = this.ctx.redLettersNumber;

    return [
        {
            elem: 'first-part',
            content: name.slice(0, redLettersNumber)
        },
        {
            elem: 'second-part',
            content: name.slice(redLettersNumber)
        }
    ];
});

block('hello').elem('first-part').attrs()(function () {
    return {
        style: 'color: red;'
    };
});

block('hello').elem('first-part').tag()('span');

block('hello').elem('second-part').tag()('span');
