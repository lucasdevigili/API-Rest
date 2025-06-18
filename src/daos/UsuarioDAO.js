import Usuario from '../models/Usuario.js';

class UsuarioDAO {
  static async criar(usuarioData) {
    try {
      return await Usuario.create(usuarioData);
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  }

  static async buscarPorEmail(email) {
    try {
      return await Usuario.findOne({ email });
    } catch (error) {
      throw new Error('Erro ao buscar usuário por email: ' + error.message);
    }
  }
}

export default UsuarioDAO;