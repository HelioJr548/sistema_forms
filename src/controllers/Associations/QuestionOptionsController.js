const Question = require('../../models/Question');
const Option = require('../../models/Option');
const Form = require('../../models/Form');

module.exports = {
    async index(req, res) {
        try {
            const { title } = req.params;

            const form = await Form.findOne({
                where: { title },
                attributes: ['id', 'title', 'description'],
                include: {
                    model: Question,
                    attributes: ['body', 'type'],
                    through: { attributes: [] },
                    include: {
                        model: Option,
                        attributes: ['text'],
                        through: { attributes: [] },
                    },
                },
            });

            return res.json(form);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async linkOptionToQuestion(req, res) {
        try {
            const { body, type, optionText } = req.body;

            // Verifica se optionText é uma string e converte para um array se necessário
            const options = Array.isArray(optionText)
                ? optionText
                : [optionText];

            const question = await Question.findOne({ where: { body, type } });

            const addedOptions = [];

            for (const text of options) {
                const [option] = await Option.findOrCreate({
                    where: { text },
                });

                if (option) {
                    await question.addOption(option);
                    addedOptions.push(option.text); // Registrar as opções adicionadas
                }
            }

            let message = 'Opções vinculadas à pergunta com sucesso!';
            if (addedOptions.length > 0) {
                message += ` Opções adicionadas: ${addedOptions.join(', ')}`;
            }

            return res.json({ message });
        } catch (error) {
            console.error('Erro ao vincular opções à pergunta:', error);
            return res.status(500).json({ error: 'Erro ao vincular opções' });
        }
    },

    async getFormData(req, res) {
        try {
            const { title } = req.body;
            // Encontre o formulário pelo título
            const form = await Form.findOne({
                where: { title },
                include: Question,
            });

            if (!form) {
                throw new Error('Formulário não encontrado');
            }

            // Obtenha todas as questões do formulário
            const questions = form.Questions;

            // Itere sobre cada questão para obter suas opções e contagem de escolhas
            const formData = [];
            for (const question of questions) {
                const options = await question.getOptions(); // Obtenha todas as opções da questão

                // Para cada opção, conte quantas vezes foi escolhida
                const optionCounts = {};
                for (const option of options) {
                    const count = await option.countQuestions(); // Obtenha a contagem de questões que escolheram essa opção
                    optionCounts[option.text] = count;
                }

                // Adicione as informações da questão e opções ao formData
                formData.push({
                    question: question.body,
                    options: optionCounts,
                });
            }

            return formData;
        } catch (error) {
            console.error('Erro ao obter dados do formulário:', error);
            throw error;
        }
    },
};
