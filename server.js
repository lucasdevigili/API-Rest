import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Alunos from './Alunos.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('conectado ao DataBase');
    } catch (error) {
        console.log('Deu erro conectado ao DataBase', error);
    }
}

connectDB();

app.post("/alunos", (req, res) => {
    try {
        const novoAluno = Alunos.create(req.body);
        res.json(novoAluno);
    } catch (err) {
        res.json({err: err});
    }
});

app.listen(PORT, () => { console.log(`O servidor está na porta ${PORT}`); })