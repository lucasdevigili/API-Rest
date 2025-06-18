import mongoose from 'mongoose';

const MatriculaSchema = new mongoose.Schema({
  aluno: mongoose.Schema.Types.ObjectId,
  curso: mongoose.Schema.Types.ObjectId,
  dataMatricula: Date
});

export default mongoose.model('Matricula', MatriculaSchema);
