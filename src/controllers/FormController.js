const Form = require('../models/Form');

module.exports = {
    async index(req, res) {
        try {
            const forms = await Form.findAll();
            return res.json(forms);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async store(req, res) {
        try {
            const { title, description } = req.body;
            const form = await Form.create({
                title, // TEXT
                description, // TEXT
            });
            return res.json(form);
        } catch (error) {
            console.error('Error creating record:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async showAllActiveStatus(req, res) {
        try {
            const { active } = req.body;
            const forms = await Form.findAll({
                where: { active },
            });
            return res.json(forms);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

   
    
};
