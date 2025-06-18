import mongoose from "mongoose";

const AlunosSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    curso: String
})

export default mongoose.model('crud', AlunosSchema);