import UsuarioDAO from '../daos/UsuarioDAO.js';
import jwt from 'jsonwebtoken';

class AuthController {
  static async registrar(req, res) {
    try {
      const { email, senha } = req.body;
      
      if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
      }

      const usuarioExistente = await UsuarioDAO.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ erro: 'Email já cadastrado.' });
      }

      const novoUsuario = await UsuarioDAO.criar({ email, senha });
      res.status(201).json({ 
        id: novoUsuario._id,
        email: novoUsuario.email
      });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao registrar usuário: ' + error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      
      if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
      }

      const usuario = await UsuarioDAO.buscarPorEmail(email);
      if (!usuario) {
        return res.status(401).json({ erro: 'Credenciais inválidas.' });
      }

      const senhaValida = await usuario.compararSenha(senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Credenciais inválidas.' });
      }

      const token = jwt.sign(
        { id: usuario._id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '5m' }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao fazer login: ' + error.message });
    }
  }
}

export default AuthController;