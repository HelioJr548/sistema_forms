const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT e autorização do usuário
function checkAuthentication(req, res, next) {
	try {
		// Verificar se o cookie contém um token
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ error: 'Token não fornecido' });
		}

		// Verificar e decodificar o token JWT
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userType = decoded.type;

		// Verificar o tipo de usuário e redirecionar conforme necessário
		if (req.params == `${process.env.SERVER}/forms`) {
			if (userType === 'admin') {
				// Se o usuário for do tipo admin, continuar com a próxima rota
				return next();
			} else {
				// Caso contrário, usuário não autorizado
				return res.status(403).json({ error: 'Acesso não autorizado' });
			}
		} else {
			return next();
		}
	} catch (error) {
		console.error('Erro ao verificar token:', error);
		return res.status(401).json({ error: 'Token inválido' });
	}
}

module.exports = checkAuthentication;
