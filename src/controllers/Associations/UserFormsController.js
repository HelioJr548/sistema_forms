const Form = require('../../models/Form');
const User = require('../../models/User');

module.exports = {
    async index(req, res) {
        try {
            const { title } = req.params;
            const form = await Form.findOne({
                where: { title },
                include: {
                    model: User,
                    attributes: ['name'],
                    through: { attributes: [] }, // Removes nested tables (in this case, the user_forms)
                    order: [['id', 'DESC']],
                },
            });

            return res.json(form);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async linkUserToForm(req, res) {
        try {
            const { title } = req.params;
            let { name } = req.body;

            // Verifica se name é uma string e converte para um array se necessário
            const users = Array.isArray(name) ? name : [name];

            const form = await Form.findOne({ where: { title } });
            const notFoundUsers = [];
            const addedUsers = [];

            for (const userName of users) {
                const foundUsers = await User.findAll({
                    where: { name: userName },
                });

                // Verificar se usuários foram encontrados
                if (foundUsers.length === 0) {
                    notFoundUsers.push(userName);
                    continue; // Pular para o próximo usuário se não for encontrado
                }

                // Adicionar usuários encontrados ao formulário
                for (const user of foundUsers) {
                    await form.addUser(user);
                    addedUsers.push(user.name); // Registrar os nomes dos usuários adicionados
                }
            }

            let message = 'Usuários vinculados ao formulário com sucesso!';
            if (addedUsers.length > 0) {
                message += ` Usuários adicionados: ${addedUsers.join(', ')}.`;
            }
            if (notFoundUsers.length > 0) {
                message += ` Os seguintes usuários não foram encontrados: ${notFoundUsers.join(
                    ', '
                )}.`;
            }

            return res.json({ message });
        } catch (error) {
            console.error('Erro ao vincular usuários ao formulário:', error);
            return res.status(500).json({ error: 'Erro ao vincular usuários' });
        }
    },
};
