const jwt = require('jsonwebtoken');

module.exports = {
    // Middleware para verificar o token JWT e autorização do usuário
    checkAuthentication(req, res, next) {
        try {
            // Verificar se o cookie contém um token
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ error: 'Token não fornecido' });
            }

            // Verificar e decodificar o token JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userType = decoded.type;

            // Verificar se o tipo de usuário é administrador
            if (userType !== 'admin') {
                return res.status(403).json({ error: 'Acesso não autorizado' });
            }

            // Se o usuário for do tipo admin, continuar com a próxima rota
            next();
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            return res.status(401).json({ error: 'Token inválido' });
        }
    },
};
