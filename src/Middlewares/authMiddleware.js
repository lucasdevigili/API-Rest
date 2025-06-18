import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Obter token do header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido ou formato inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ erro: 'Token expirado. Sessão encerrada após 5 minutos.' });
    }
    return res.status(401).json({ erro: 'Token inválido.' });
  }
};

export default authMiddleware;