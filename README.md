# rinha-de-compiler
JavaScript interpret para a [Rinha de Compiler](https://github.com/aripiprazole/rinha-de-compiler)

## TODO 
Basicamente implementar tudo que tem na [especificação da arvore sintática abstrata](https://github.com/aripiprazole/rinha-de-compiler/blob/main/SPECS.md).

## Como Rodar
Meu interpretador consegue interpretar algo como abaixo:

```
print ("Lucas Montano says hello, world")
```

Tendo um JSON do AST conforme abaixo:
```
{
  "name": "hello.rinha",
  "expression": {
    "kind": "Print",
    "value": {
      "kind": "Str",
      "value": "Lucas Montano says hello, world",
      "location": {
        "start": 8,
        "end": 40,
        "filename": "hello.rinha"
      }
    },
    "location": {
      "start": 0,
      "end": 41,
      "filename": "hello.rinha"
    }
  }
}
```
