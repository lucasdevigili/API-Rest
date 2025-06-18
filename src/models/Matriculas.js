import mongoose from 'mongoose';

const MatriculaSchema = new mongoose.Schema({
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
  curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
  dataMatricula: { type: Date, default: Date.now }
});

export default mongoose.model('Matricula', MatriculaSchema);
