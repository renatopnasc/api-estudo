const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

const usersController = new UsersController();

function myMiddleware(request, response, next) {
  console.log("Você passou pelo middleware");
  if (!request.body.isAdmin) {
    return response.status(401).json({ message: "Acesso negado" });
  }
  next();
}

// Query params (não são obrigatórios serem passados para a página retornar uma response)
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;
