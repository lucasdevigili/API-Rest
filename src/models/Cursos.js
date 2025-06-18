import mongoose from 'mongoose';

const CursoSchema = new mongoose.Schema({
  nome: String,
  descricao: String
});

export default mongoose.model('Curso', CursoSchema);
