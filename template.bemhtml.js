block('hello').content()(function () {
    var state = this.ctx.js;
    var name = state.name || '';
    var redLettersNumber = state.redLettersNumber || 0;

    return [
        {
            content: [
                {
                    tag: 'span',
                    content: 'Red letter number: '
                },
                {
                    tag: 'span',
                    content: redLettersNumber
                }
            ]
        },
        {
            content: [
                {
                    tag: 'span',
                    content: 'Type name:'
                },
                {
                    block: 'input',
                    mix: {block: 'hello', elem: 'name-input'}
                }
            ]
        },
        {
            content: [
                {
                    tag: 'span',
                    content: 'Result: '
                },
                {
                    elem: 'first-part',
                    content: name.slice(0, redLettersNumber)
                },
                {
                    elem: 'second-part',
                    content: name.slice(redLettersNumber)
                }
            ]
        },
        {
            block: 'button',
            mix: {block: 'hello', elem: 'increment-button'},
            content: 'Increment red letters number'
        },
        {
            block: 'button',
            mix: {block: 'hello', elem: 'decrement-button'},
            content: 'Decrement red letters number'
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

block('button').tag()('button');

block('input').tag()('input');
