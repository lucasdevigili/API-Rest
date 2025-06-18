import mongoose from "mongoose";

const AlunosSchema = new mongoose.Schema({
    nome: String,
    idade: Number
})

export default mongoose.model('aluno', AlunosSchema);