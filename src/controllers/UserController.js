const User = require('../models/User');

module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            // Handle the error (e.g., log it or send an error response)
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async store(req, res) {
        try {
            const { cpf, name, email, password, type } = req.body;

            const user = await User.create({
                cpf, // TEXT
                name, // TEXT
                email, // TEXT
                password, // TEXT
                type, // TEXT
            });

            return res.json(user);
        } catch (error) {
            // Handle the error (e.g., log it or send an error response)
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};
