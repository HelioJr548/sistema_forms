const Form = require('../models/Form');
const User = require('../models/User');

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

	async storeUser(req, res) {
		const { title } = req.params;
		const { name } = req.body;

		const form = await Form.findOne({ where: { title } });
		const user = await User.findOne({ where: { name } });

		user.addForm(form);

		return res.json(form);
	},
};
