
function interpret(node, environment) {
    switch (node.kind) {
        case 'Str':
            return node.value;
        case 'Print':
            const term = interpret(node.value, environment);
            switch (typeof term) {
                case 'string':
                    console.log(term);
                    return term;
                default:
                    return `Error: Unexpected term`;
            }
        default:
            return `Error: Unknown node kind: ${node.kind}`;
    }
}

module.exports = interpret;
