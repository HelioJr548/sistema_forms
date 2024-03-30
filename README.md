# Node.js com Sequelize

## Iniciando Projeto

`npm init -y` ou `yarn init -y`

### Instalando Dependencias

* Do Projeto:
  * `npm i dotenv express pg pg-hstore sequelize` OU `yarn add dotenv express pg pg-hstore sequelize`
* De Desenvolvimento:
  * `npm i nodemon sequelize-cli -D` OU `yarn add nodemon sequelize-cli -D`

## Iniciando Banco de Dados

Após configurar definições do banco em [src\config\database.js](src\config\database.js) :

### Criação do banco:

`npx sequelize db:create` OU `yarn sequelize db:create`

### Criação de Migrations:

Migrations são uma forma de controlar as alterações do schema (estrutura) do banco de dados de uma aplicação . Elas permitem criar, alterar ou remover tabelas, colunas, índices, chaves etc. e compartilhar essas mudanças com outros desenvolvedores.
