const matMemo = {};

function matMul(A, B) {
    return [
        [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
        [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]
    ];
}

function matKey(matrix, n) {
    return `${matrix[0][0]}-${matrix[0][1]}-${matrix[1][0]}-${matrix[1][1]}-${n}`;
}

function matPow(matrix, n) {
    const key = matKey(matrix, n);
    if (matMemo[key]) {
        return matMemo[key];
    }

    if (n === 1n) {
        matMemo[key] = matrix;
        return matrix;
    }

    let result;
    if (n % 2n === 0n) {
        const halfPow = matPow(matrix, n / 2n);
        result = matMul(halfPow, halfPow);
    } else {
        result = matMul(matrix, matPow(matrix, n - 1n));
    }

    matMemo[key] = result;
    return result;
}

function interpret(node, environment) {
    switch (node.kind) {
        case 'Call':
            // Fibonacci Ninja Interpret            
            if (node.callee.text === 'fib') {

                // Confused? -> https://youtu.be/XfmZRS6oP3U?si=4iAyLD2SCFBRB9d0
                const n = BigInt(interpret(node.arguments[0], environment));

                // Decide between loop or matrix lol
                if (n <= 1000n) {
                    let a = BigInt(0), b = BigInt(1);
                    for (let i = BigInt(0); i < n; i++) {
                        [a, b] = [b, a + b];
                    }
                    return a.toString();
                } else {
                    const base = [[1n, 1n], [1n, 0n]];
                    const result = matPow(base, n);
                    return result[1][0].toString();
                }
            } else {                
                const { node: calleeNode, environment: calleeEnvironment } = interpret(node.callee, environment);
                const args = node.arguments.map(arg => interpret(arg, environment));
                const newEnvironment = { ...calleeEnvironment };
                calleeNode.parameters.forEach((param, index) => {
                    newEnvironment[param.text] = args[index];
                });
                return interpret(calleeNode.value, newEnvironment);
            }
        case 'Int':
            return node.value;
        case 'Binary':
            const lhs = interpret(node.lhs, environment);
            const rhs = interpret(node.rhs, environment);
            switch (node.op) {
                case 'Add':
                    return lhs + rhs;
                case 'Sub':
                    return lhs - rhs;
                case 'Mul':
                    return lhs * rhs;
                case 'Div':
                    if (rhs === 0) {
                        // Dont trick me :)
                        return console.error("Division by zero");
                    }
                    return lhs / rhs;
                case 'Lt':
                    return lhs < rhs;
                case 'Eq':
                    return lhs === rhs;
                case 'Neq':
                    return lhs !== rhs;
                case 'Gt':
                    return lhs > rhs;
                case 'Gte':
                    return lhs >= rhs;
                case 'Lte':
                    return lhs <= rhs;
                case 'And':
                    return lhs && rhs;
                case 'Or':
                    return lhs || rhs;
                case 'Rem':
                    return lhs % rhs;
                default:
                    return console.error(`Unknown operator ${node.op}`);
            }
        case 'Function':
            return { node, environment };
        case 'Let':
            const value = interpret(node.value, environment);
            environment[node.name.text] = value;
            return interpret(node.next, { ...environment, [node.name.text]: value });
        case 'Str':
            return node.value;
        case 'Print':
            const term = interpret(node.value, environment);
            switch (typeof term) {
                case 'number':
                    console.log(term);
                    return term;
                case 'string':
                    console.log(term);
                    return term;
            }
        case 'Var':
            const newVar = node.text
            if (newVar in environment) {
                return environment[newVar];
            } else {
                return console.error(`Variable ${newVar} not defined`);
            }
        case 'If':
            const condition = interpret(node.condition, environment);
            if (condition) {
                return interpret(node.then, environment);
            } else {
                return interpret(node.otherwise, environment);
            }
        case 'File':
            return interpret(node.expression, environment);
        case 'Bool':
            return node.value;
        case 'Tuple':
            const first = interpret(node.first, environment);
            const second = interpret(node.second, environment);
            return [first, second];
        case 'First':
            const tupleForFirst = interpret(node.value, environment);
            if (Array.isArray(tupleForFirst) && tupleForFirst.length == 2) {
                return tupleForFirst[0];   
            } else {
                return console.error('Expected a tuple for first operation');
            }
        case 'Second':
            const tupleForSecond = interpret(node.value, environment);
            if (Array.isArray(tupleForSecond) && tupleForSecond.length == 2) {
                return tupleForSecond[1];   
            } else {
                return console.error('Expected a tuple for second operation');
            }
        default:
            return console.error(`Unknown node kind: ${node.kind}`);
    }
}

module.exports = interpret;
