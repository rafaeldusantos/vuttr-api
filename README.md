# API VUTT - teste BossaBox 
> Essa é apenas uma API modelo para o desafio da Bossabox

[![NPM Version](https://img.shields.io/badge/build-passing-green.svg)](https://npmjs.org/package/badge-maker)


API desenvolvido para o challenge da Bossabox. Aplicação baseia-se em um CRUD para gerenciamento de ferramentas e utilitários (VUTTR - Very Useful Tools to Remember). Para mais informações de funcionalidades, contratos e rotas, acessar a [Documentação da API](https://gitlab.sicredi.net/TRANSF/account-data).


## Funcionalidades

* Listagem de Ferramentas
* Consulta de ferramentas por TAG
* Adicionar uma nova ferramenta
* Remover uma ferramenta

## Instalando e iniciando a aplicação


No diretório do projeto, você pode executar os comandos para baixar as dependências do projeto e inicializa-la.

No terminal, clone o projeto:
```
git clone https://github.com/rafaeldusantos/vuttr-api.git
```

Entre na pasta do projeto

```
cd vuttr-api
```

Instalar as depências e iniciar a aplicação

>Node
```sh
$ npm i
$ npm start:dev
```
> API disponivel na URL `http:\\localhost:3000`

## Rodar os testes


Testes unitários
```sh
$ npm run test:unit
```

Testes integrados
```sh
$ npm run test:integration
```