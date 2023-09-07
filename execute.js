
const fs = require('fs');
const interpret = require('./interpreter');

function executeRinhaCode(filePath, initialEnvironment = {}) {
    try {
        const rawData = fs.readFileSync(filePath);
        const ast = JSON.parse(rawData);
        const environment = { ...initialEnvironment };
        return interpret(ast.expression, environment);
    } catch (error) {
        console.error('Erro ao executar o código da rinha:', error.message);
        return null;
    }
}

const filePath = './var/rinha/source.hello.json';
executeRinhaCode(filePath, {});
