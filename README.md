# rinha-de-compiler
JavaScript interpret para a [Rinha de Compiler](https://github.com/aripiprazole/rinha-de-compiler)

## HOW TO RUN

**Clone**
```
git clone git@github.com:lucasmontano/rinha-de-compiler.git
```

### With Docker

```
docker build -t rinha .

docker run --mount type=bind,source=/var/rinha/source.rinha.json,target=/var/rinha/source.rinha.json --memory=2gb --cpus=2 rinha
```

### Without Docker

**MacOS**
```
brew install node
node execute.js
```

**Linux**
```
sudo apt update
sudo apt install nodejs npm
node execute.js
```

## DONE

Meu interpretador sabe fazer 2 coisas apenas, Hello World e Fibonacci lol

### Simples Hello World
```
print ("Lucas Montano says hello, world")
```

### Fibonacci Ninja :)

A pegadinha pode estar em algoritmos como Fibonacci que pode ser fornecido como recursão. Se tu não viu ainda recomendo ver esse meu [video aqui](https://youtu.be/XfmZRS6oP3U?si=4iAyLD2SCFBRB9d0).
