const Form = require('../models/Form');

module.exports = {
    async index(req, res) {
        try {
            const forms = await Form.findAll();
            return res.json(forms);
        } catch (error) {
            console.error('Error fetching forms:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async store(req, res) {
        try {
            const { title, description } = req.body;
            const form = await Form.create({ title, description });
            return res.json(form);
        } catch (error) {
            console.error('Error creating form:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};
