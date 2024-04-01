const Form = require('../models/Form');
const { v4: uuidv4 } = require('uuid');

module.exports = {
	async index(req, res) {
		const form = await Form.findAll();

		return res.json(form);
	},

	async store(req, res) {
		const { title, description } = req.body;

		const form = await Form.create({
			title,
			description,
		});
		return res.json(form);
	},
};
