# API VUTT - teste BossaBox 
> Essa é apenas uma API modelo para o desafio da Bossabox

[![NPM Version](https://img.shields.io/badge/build-passing-green.svg)](https://npmjs.org/package/badge-maker)


API desenvolvido para o challenge da Bossabox. Aplicação baseia-se em um CRUD para gerenciamento de ferramentas e utilitários (VUTTR - Very Useful Tools to Remember). Para mais informações de funcionalidades, contratos e rotas, acessar a [Documentação da API](https://aproximma-vuttr-api.herokuapp.com/api-docs/).


## Funcionalidades

* Listagem de Ferramentas
* Consulta de ferramentas por TAG
* Adicionar uma nova ferramenta
* Remover uma ferramenta

## Rotas

* Listagem de Ferramentas
* Consulta de ferramentas por TAG
* Adicionar uma nova ferramenta
* Remover uma ferramenta

## Rotas

Rotas disponiveis na API:

* `GET /tools` : lista as todas as ferramentas cadastradas
* `POST /tools` : registra uma nova ferramenta
* `DELETE /tools/:id` : deleta a ferramenta pelo ID
* `POST /auth/login` : Autenticar no sistema
* `POST /auth/registration` : Registrar um novo usuário :closed_lock_with_key:
* `POST /auth/logour` : Sair do sistema :closed_lock_with_key:

Para filtrar na rota `GET /tools`, você pode usar o parâmetro `s=:string` para filtrar por todos os campos (título, descrição, link ou tag) ou `tag=:string` para filtrar pelo array **tags**

> As rotas `/tools` não possuem **autenticação** para cumprir os requisitos principais do teste.


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

>com NPM
```sh
$ npm i
$ npm start:dev
```

>com DOCKER
```sh
$ docker-compose up --build
```


API disponivel na URL `http:\\localhost:3000`

## Rodar os testes


Para rodar os testes unitários usar o comando:
```sh
$ npm run test:unit
```

Para rodar os testes de integração usar o comando:
```sh
$ npm run test:integration
```