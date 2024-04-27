const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

module.exports = {
    async register(req, res) {
        try {
            const { name, cpf, email, password, type } = req.body;

            if (!name || !cpf || !email || !password) {
                return res
                    .status(400)
                    .json({ error: 'Todos os campos são obrigatórios' });
            }

            const userExists = await User.findOne({ where: { cpf, email } });
            if (userExists) {
                return res.status(400).json({ error: 'Usuário já existe' });
            }

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            await User.create({
                cpf,
                name,
                email,
                password: passwordHash,
                type,
            });

            return res.status(201).json({ msg: 'Usuário criado com sucesso!' });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async login(req, res) {
        try {
            const { cpf, password } = req.body;

            // Verificar se CPF e senha foram fornecidos
            if (!cpf || !password) {
                return res
                    .status(400)
                    .json({ error: 'CPF e senha são obrigatórios' });
            }

            const user = await User.findOne({ where: { cpf } });

            // Verificar se o usuário existe
            if (!user || !(await bcrypt.compare(password, user.password))) {
                res.status(200).json({ redirectTo: '/signup' });
                return res
                    .status(401)
                    .json({ error: 'CPF ou senha incorretos' });
            }

            // Gerar token JWT
            const token = jwt.sign(
                { cpf: user.cpf, type: user.type },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.cookie('token', token, { maxAge: 3600000, httpOnly: true });

            if (user.type === 'admin') {
                res.status(200).json({ redirectTo: '/admin' });
            } else {
                res.status(200).json({ redirectTo: '/signup' });
            }
        } catch (error) {
            console.error('Erro ao efetuar login:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async logout(req, res) {
        try {
            // Limpar o cookie que armazena o token JWT
            res.clearCookie('token');
            res.clearCookie('form');

            // Redirecionar o usuário para a página de login
            res.redirect('/login'); // Substitua "/login" pelo caminho da sua página de login
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
};
