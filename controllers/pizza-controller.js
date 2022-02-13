const { Pizza } = require("../models");

// ====================================================================================================
// get all pizzas
// ====================================================================================================
const pizzaController = {
	// Mongoose `find()` method similar to Sequelize `findAll()`
	getAllPizza(req, res) {
		Pizza.find({})
			.populate({
				path: "comments",
				select: "-__v",
			})
			.select("-__v")
			.sort({ _id: -1 })
			.then((dbPizzaData) => res.json(dbPizzaData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// ====================================================================================================
	// get one pizza by ID
	// ====================================================================================================
	getPizzaById({ params }, res) {
		Pizza.findOne({ _id: params.id })
			.populate({
				path: "comments",
				select: "-__v",
			})
			.select("-__v")
			.then((dbPizzaData) => {
				if (!dbPizzaData) {
					res.status(404).json({ message: "No pizza found with this id." });
					return;
				}
				res.json(dbPizzaData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// ====================================================================================================
	// POST: create new pizza
	// ====================================================================================================
	createPizza({ body }, res) {
		Pizza.create(body)
			.then((dbPizzaData) => res.json(dbPizzaData))
			.catch((err) => res.status(400).json(err));
	},
	// ====================================================================================================
	// PUT: update pizza by id
	// ====================================================================================================
	updatePizza({ params, body }, res) {
		// Mongoose method `findOneAndUpdate()`
		// if setting third param to true, it returns updated document. If false, it'll return original document.
		Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then((dbPizzaData) => {
				if (!dbPizzaData) {
					res.status(404).json({ message: "No pizza found with this id" });
					return;
				}
				res.json(dbPizzaData);
			})
			.catch((err) => res.status(400).json(err));
	},
	// ====================================================================================================
	// DELETE: delete pizza
	// ====================================================================================================
	deletePizza({ params }, res) {
		Pizza.findOneAndDelete({ _id: params.id })
			.then((dbPizzaData) => {
				if (!dbPizzaData) {
					res.status(404).json({ message: "No pizza found with this id" });
					return;
				}
				res.json(dbPizzaData);
			})
			.catch((err) => res.status(400).json(err));
	},
};

module.exports = pizzaController;
