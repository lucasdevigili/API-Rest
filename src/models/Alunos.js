import mongoose from "mongoose";

const AlunosSchema = new mongoose.Schema({
    nome: String,
    idade: Number
}, {
    timestamps: true
});

export default mongoose.model('Aluno', AlunosSchema);