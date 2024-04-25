const Form = require('../../models/Form');
const Question = require('../../models/Question');

module.exports = {
	async index(req, res) {
		try {
			const { title } = req.params;
			if (!title) {
				return res
					.status(400)
					.json({ error: 'Title parameter is required' });
			}

			const form = await Form.findOne({
				where: { title },
				attributes: ['id', 'title', 'description'],
				include: {
					model: Question,
					attributes: ['body', 'type'],
					through: { attributes: [] },
				},
			});

			if (!form) {
				return res.status(404).json({ error: 'Form not found' });
			}

			return res.json(form);
		} catch (error) {
			console.error('Error fetching data:', error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	},

	async linkQuestionToForm(req, res) {
		try {
			const { title } = req.params;
			const { body, type } = req.body;

			if (!title) {
				return res
					.status(400)
					.json({ error: 'Title parameter is required' });
			}

			const form = await Form.findOne({ where: { title } });
			if (!form) {
				return res.status(404).json({ error: 'Form not found' });
			}

			const linkedQuestions = [];

			const [question, created] = await Question.findOrCreate({
				where: { body },
				defaults: { type },
			});

			await form.addQuestion(question);

			linkedQuestions.push({ body, type });

			return res.json({
				message: 'Questions linked to form successfully!',
				linkedQuestions,
			});
		} catch (error) {
			console.error('Error linking questions to form:', error);
			return res
				.status(500)
				.json({ error: 'Error linking questions to form' });
		}
	},
};
