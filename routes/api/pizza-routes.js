const router = require("express").Router();

const {
	getAllPizza, //
	getPizzaById,
	createPizza,
	updatePizza,
	deletePizza,
} = require("../../controllers/pizza-controller");

// /api/pizzas Set up GET all and POST
router //
	.route("/")
	.get(getAllPizza)
	.post(createPizza);

// /api/pizzas/:id Set up GET one, PUT, and DELETE
router //
	.route("/:id")
	.get(getPizzaById)
	.put(updatePizza)
	.delete(deletePizza);

module.exports = router;
