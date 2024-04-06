const User = require('../models/User');

module.exports = {
	async index(req, res) {
		const user = await User.findAll();

		return res.json(user);
	},

	async store(req, res) {
		const { cpf, name, email, password, type } = req.body;

		const user = await User.create({
			cpf,
			name,
			email,
			password,
			type,
		});
		return res.json(user);
	},
};
