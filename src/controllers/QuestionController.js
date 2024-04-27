const Question = require('../models/Question');

module.exports = {
    async index(req, res) {
        try {
            const questions = await Question.findAll();
            res.json(questions);
        } catch (error) {
            // Handle the error (e.g., log it or send an error response)
            console.error('Error fetching questions:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async store(req, res) {
        try {
            const { body, type } = req.body;

            // Verifica se a questão já existe no banco de dados
            const [question, created] = await Question.findOrCreate({
                where: { body, type },
            });

            // Se a questão já existir, retorna uma mensagem de aviso
            if (!created) {
                return res
                    .status(400)
                    .json({ alert: 'Question already exists in the database' });
            }

            // Se a questão for criada com sucesso, retorna a questão
            return res
                .status(201)
                .json({ message: 'Question created successfully', question });
        } catch (error) {
            // Trata o erro
            console.error('Error creating question:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};
