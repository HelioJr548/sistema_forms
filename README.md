
# Node.js com Sequelize

## Iniciando Projeto

`npm init -y` ou `yarn init -y`

### Instalando Dependencias

* Do Projeto:
  * `npm i dotenv express pg pg-hstore sequelize` OU `yarn add dotenv express pg pg-hstore sequelize`
* De Desenvolvimento:
  * `npm i nodemon sequelize-cli -D` OU `yarn add nodemon sequelize-cli -D`

## Iniciando Banco de Dados

Após configurar definições do banco em [src/config/database.js](src/config/database.js) :

### Criação do banco:

`npx sequelize db:create` OU `yarn sequelize db:create`

### Criação de Migrations:

Migrations são uma forma de controlar as alterações do schema (estrutura) do banco de dados de uma aplicação . Elas permitem criar, alterar ou remover tabelas, colunas, índices, chaves etc. e compartilhar essas mudanças com outros desenvolvedores.

1. Adicionar `'migrations-path': path.resolve(__dirname, 'src', 'database', 'migrations')` no arquivo [.sequelizerc](.sequelizerc).
2. Rodar CLI no terminal: `npx sequelize migration:create --name=create-ADICIONE_NOME_DA_TABELA_AQUI` OU `yarn sequelize migration:create --name=create-ADICIONE_NOME_DA_TABELA_AQUI` , esse comando gerará um arquivo no formato `TIMESTAMP-create-NOME_TABELA.js`.
3. Dentro do arquivo criado, insira o codigo desejado para criação da tabela. (exemplos em [src/database/migrations](src/database/migrations))
4. Após codigo pronto, para criar as tabelas, rodar CLI no terminal: `npx sequelize db:migrate` OU `yarn sequelize db:migrate`.
5. Caso queira desfazer a ultima migration que ja foi para o banco, podemos usar o comando no terminal: `npx sequelize db:migrate:undo` OU `yarn sequelize db:migrate:undo`.

***Lembrando que utilizamos o 5° passo apenas enquanto em desenvolvimento, quando aplicação estiver em produção devemos fazer uma nova migration, caso desejemos alterar/adicionar algum campo nas tabelas***
