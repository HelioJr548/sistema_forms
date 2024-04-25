require('dotenv').config();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
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
                return res
                    .status(401)
                    .json({ error: 'CPF ou senha incorretos' });
            }

            // Gerar token JWT
            const token = jwt.sign(
                { cpf: user.cpf, type: user.type },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                }
            );

            res.cookie('token', token, { maxAge: 3600000, httpOnly: true }); // MaxAge em milissegundos (1 hora)

            // Enviar token e criar sessão como resposta
            res.json({ token });
            console.log(token);
        } catch (error) {
            console.error('Erro ao efetuar login:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async register(req, res) {
        try {
            const { name, cpf, email, password, type } = req.body;

            // Verificar se todos os campos obrigatórios foram fornecidos
            if (!name || !cpf || !email || !password) {
                return res
                    .status(400)
                    .json({ error: 'Todos os campos são obrigatórios' });
            }

            // Verificar se o usuário já existe
            const userExists = await User.findOne({ where: { cpf, email } });
            if (userExists) {
                return res.status(400).json({ error: 'Usuário já existe' });
            }

            // Gerar o hash da senha
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            // Criar o usuário dentro de uma transação
            await User.create({
                cpf,
                name,
                email,
                password: passwordHash,
                type,
            });

            // Retornar uma resposta de sucesso
            res.status(201).json({ msg: 'Usuário criado com sucesso!' });
        } catch (error) {
            // Handle the error (e.g., log it or send an error response)
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
};
