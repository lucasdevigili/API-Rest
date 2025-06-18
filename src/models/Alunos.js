import mongoose from "mongoose";

const AlunosSchema = new mongoose.Schema({
    nome: {type: String, required: [true, "Qual o nome do aluno a ser cadastrado? "]},
    idade: {type: Number, required: [true, "Qual a idade do aluno? "]}
}, {
    timestamps: true
});

export default mongoose.model('Aluno', AlunosSchema);