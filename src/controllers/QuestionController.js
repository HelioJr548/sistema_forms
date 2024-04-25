const Question = require('../models/Question');

module.exports = {
	async index(req, res) {
		try {
            const question = await Question.findAll();
            return res.json(question);
        } catch (error) {
            console.error('Error fetching forms:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
	},

	async store(req, res) {
		try {
			const { body, type } = req.body;

			// Cria ou encontra a questão
			const [question, created] = await Question.findCreateFind({
				where: { body },
				defaults: { body, type },
			});

			// Verifica se a questao foi encontrada
			if (!created) {
				const errorMessage = 'Question already exists.';
				console.error(errorMessage);
				return res.status(404).json({ error: errorMessage });
			}

			// Retorna a questão criada
			return res.json(question);
		} catch (error) {
			// Captura e trata erros inesperados
			const errorMessage =
				'An error occurred while processing the request.';
			console.error(errorMessage, error);
			return res.status(500).json({ error: errorMessage });
		}
	},
};
