require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");

// Importando o express
const express = require("express");

const routes = require("./routes");
//Quando o servidor é rodado, caso não existe nenhum arquivo de bd na pasta selecionada, ele irá gerar um novo arquivo
migrationsRun();

// Inicializando o express
const app = express();
// Informo ao express que o valor padrão recebido será JSON
app.use(express.json());
// Indicando as rotas que devem ser lidas pelo servidor
app.use(routes);

app.use((error, request, response, next) => {
  // Se o error que foi gerado for uma instancia de AppError (foi lançado e criado uma instância),
  // o if sera executado
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// Definindo a porta
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Route params (é obrigatório ser passado para a página retornar uma response)
// app.get("/message/:id›", (request, response) => {
//   const { id, user } = request.params;
//   response.send(`
//     ID da mensagem é: ${id}.
//     Para o usuário: ${user}
//   `);
// });
