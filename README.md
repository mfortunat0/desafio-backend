![Logo OW Interactive](https://github.com/owInteractive/desafio-backend/raw/master/media/logo.jpg "OW Interactive")

# Desafio Back-End - OW Interactive 21/22

## Iniciando projeto

Para iniciar o projeto siga os seguintes passo.

### Variaveis

Crie um arquivo `.env` semelhante ao `.env.sample` com as seguintes variaveis.<br><br>
`PORT` - Porta em que roda o servidor <br>
`SECRET` - Chave para geração de tokens autenticados<br>
`OPENING_BALANCE` - Valor do saldo inicial<br>
`ADMIN_NAME`- Nome do administrador<br>
`ADMIN_EMAIL`- Email do administrador<br>
`ADMIN_BIRTHDAY`- Data de nascimento do administrador<br>
`ADMIN_PASSWORD`- Senha do admistrador<br>
`DATABASE_USER` - Nome do usuario do banco de dados<br>
`DATABASE_PASSWORD` - Senha do usuario do banco de dados<br>
`DATABASE_NAME`- Nome do banco de dados a ser utilizado

### Rodando ambiente para desenvolvimento

Para testar e desenvolver a aplicação existe o arquivo `docker-compose.dev.yml` que sobe todo ambiente para desenvolvimento com refresh na mudança de arquivos.
Basta rodar o seguinte comando:

```bash
docker-compose -f docker-compose.dev.yml up
```

Assim que iniciado sera exibido no console `Servidor iniciado na porta X`, tambem sera gerado o usuario administrador e um usuario comun, o usuario comun tambem havera feito algumas transações para teste.

### Rodando ambiente para produção

Para subir a aplicação como desenvolvimento basta rodar o seguinte comando:

```bash
docker-compose up
```

### Rotas

- POST - http://localhost:3000/user

  - Rota utilizada para criação de um novo usuario.
  - Necessita que seja pasada no corpo da requisição um json contendo (name, email, password, birthday)

- GET - http://localhost:3000/user

  - Rota utilizada para vizualização de todos os usuarios.
  - Necessita que seja passada no cabeçalho da requisição o `token` (Bearer) do administrador

- GET - http://localhost:3000/user/**userId**

  - Rota utilizada para vizualização de um usuario.
  - Necessita que seja passada no cabeçalho da requisição o `token` (Bearer) do administrador

- DELETE - http://localhost:3000/user/**userId**

  - Rota utilizada para remover um usuario.
  - Necessita que seja passada no cabeçalho da requisição o `token` (Bearer) do administrador

- PUT - http://localhost:3000/openingBalance

  - Rota utilizada para atualizar o saldo inicial.
  - Necessita que seja passada no cabeçalho da requisição o `token` (Bearer) do administrador

- POST - http://localhost:3000/login

  - Rota utilizada para geração de tokens para autenticação
  - Necessita que seja pasada no corpo da requisição um json contendo (email,password)

- POST - http://localhost:3000/transaction/credit/**userId**

  - Rota utilizada para criação de movimentação de credito
  - Necessita que seja pasada no corpo da requisição um json contendo (value) e na url o `id` do usuario.

- POST - http://localhost:3000/transaction/debit/**userId**

  - Rota utilizada para criação de movimentação de debito
  - Necessita que seja pasada no corpo da requisição um json contendo (value) e na url o `id` do usuario.

- POST - http://localhost:3000/transaction/reverse/**userId**

  - Rota utilizada para criação de movimentação de estorno
  - Necessita que seja pasada no corpo da requisição um json contendo (value) e na url o `id` do usuario.

- GET - http://localhost:3000/transaction/**userId**

  - Rota utilizada para vizualização de todas as movimentações de um usuario
  - Necessita que seja pasada na url o `id` do usuario.

- GET - http://localhost:3000/user/**userId**/total

  - Rota utilizada para vizualização do saldo atual de um usuario
  - Necessita que seja pasada na url o `id` do usuario.

- GET - http://localhost:3000/transaction/report/**userId**

  - Rota utilizada para vizualização das transações retornando em um arquivo em CSV
  - Necessita que seja pasada na url o `id` do usuario.

- GET - http://localhost:3000/transaction/report/**userId**/**Mes**/**Ano**

  - Rota utilizada para vizualização das transações de um periodo de tempo retornando em um arquivo em CSV
  - Necessita que seja pasada na url o `id` do usuario, Mes e Ano.

- GET - http://localhost:3000/transaction/report/**userId**/last

  - Rota utilizada para vizualização das transações de ate 30 dias atraz retornando em um arquivo em CSV
  - Necessita que seja pasada na url o `id` do usuario.

- DELETE - http://localhost:3000/transaction/**transactionId**
  - Rota utilizada para remover uma transação
  - Necessita que seja pasada na url o `id` da transação.

## Desafios

- [x] Criar um endpoint onde é cadastrado um usuário.
  - [x] Esses usuários devem ter obrigátoriamente os seguintes dados modelados, caso você ache necessário outros campos fique a vontade.
    - **name** | string (Nome)
    - **email** | string (E-mail)
    - **birthday** | date (Data de aniversário)
    - **created_at** | datetime (Criado Em)
    - **updated_at** | datetime (Atualizado Em)
- [x] Criar um endpoint para listagem desses usuários, ordernados por ordem de cadastro decrescente (mais novo para mais antigo);
- [x] Criar um endpoint para listar um único usuário através do seu id;
- [x] Criar um endpoint para excluir um usuário através do seu id.
- [x] Criar um endpoint ou endpoint`s onde é possível associar uma operação de débito, crédito ou estorno para o usuário;
- [x] Criar um endpoint onde seja possível visualizar toda a movimentação (páginada) do usuários mais as suas informações pessoais;
- [x] Criar um endpoint onde seja possível excluir uma movimentação relacionada a um usuário;
- [x] Criar um endpoint onde é retornado um arquivo no formato (csv) com 3 tipos de filtros para as movimentações:
  - Últimos 30 dias;
  - Passando o mês e ano por exemplo: 06/20;
  - Todo as movimentações;
- [x] Adicionar dentro do usuário um campo para saldo inicial, e criar um endpoint para alterar esse valor;
- [x] Criar um endpoint com a soma de todas as movimentações (débito, crédito e estorno) mais o saldo inicial do usuário;
- [x] No endpoint que exclui um usuário, adicionar a funcionalidade que agora não será mais possível excluir um usuário que tenha qualquer tipo de movimentação ou saldo;
- [x] No endpoint que cadastra usuário, adicionar a funcionalidade que apenas maiores de 18 anos podem criar uma conta;
- [x] No endpoint que exporta o arquivo CSV criar um cabeçalho com os dados do cliente e o seu saldo atual;
- [x] Criar validações com base na Request;
- [x] Utilizar cache para otimizar as consultas e buscas;
- [x] Criar Seeders ou Inicializadores de dados para o usuários e suas movimentações;
- [x] Criar os métodos baseados em algum método de autênticação.
- Documentação dos endpoint`s;
