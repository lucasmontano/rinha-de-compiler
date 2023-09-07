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
                const callee = interpret(node.callee, environment);
                const args = node.arguments.map(arg => interpret(arg, environment));
                const newEnvironment = { ...environment };
                callee.parameters.forEach((param, index) => {
                    newEnvironment[param] = args[index];
                });
                return interpret(callee.value, newEnvironment);
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
                default:
                    return console.error(`Unknown operator ${node.op}`);
            }    
        case 'Function':
            return node;
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
        default:
            return console.error(`Unknown node kind: ${node.kind}`);
    }

    // Helper function to multiply 2x2 matrices
    function matMul(A, B) {
        return [
            [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]],
            [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]]
        ];
    }

    // Helper function to power a 2x2 matrix
    function matPow(matrix, n) {
        if (n === 1n) return matrix;
        if (n % 2n === 0n) {
            const halfPow = matPow(matrix, n / 2n);
            return matMul(halfPow, halfPow);
        }
        return matMul(matrix, matPow(matrix, n - 1n));
    }
}

module.exports = interpret;
