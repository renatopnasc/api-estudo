const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();

const notesController = new NotesController();

// Query params (não são obrigatórios serem passados para a página retornar uma response)
notesRoutes.post("/:user_id", notesController.create);

module.exports = notesRoutes;