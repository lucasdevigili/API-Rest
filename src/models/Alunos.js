import mongoose from "mongoose";

const AlunosSchema = new mongoose.Schema({
    nome: {type: String, required: [true, "Qual o nome do aluno a ser cadastrado? "]},
    idade: {type: Number, required: [true, "Qual a idade do aluno? "]},
    curso: {type: String, required: [true, "Para qual curso o aluno será cadastrado? "]}
}, {
    timestamps: true
});

export default mongoose.model('Aluno', AlunosSchema);