import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UsuarioSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  senha: { 
    type: String, 
    required: true,
    minlength: [6, 'Senha deve ter no mínimo 6 caracteres'] 
  }
});

// Hash da senha antes de salvar
UsuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
UsuarioSchema.methods.compararSenha = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

export default mongoose.model('Usuario', UsuarioSchema);