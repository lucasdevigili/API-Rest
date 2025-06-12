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
        res.json({ err: err });
    }
});

app.get('/alunos', async (req, res) => {
    try {
        const aluno = await Alunos.find()
        res.json(aluno);
    } catch (error) {
        res.json({ error: error });
    }
})

app.put('/alunos/:id', async (req, res) => {
    //req.params.id
    try {
        const novoaluno = await Alunos.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true }
        )
        res.json(novoaluno);
    } catch (error) {
        res.json({ error: error });
    }
})


app.delete('/alunos/:id', async (req, res) => {
    //req.params.id
    try {
        const anulodeletado = await Alunos.findByIdAndDelete(
            req.params.id
        )
        res.json(alunodeletado);
    } catch (error) {
        res.json({ error: error });
    }
})

app.listen(PORT, () => { console.log(`O servidor está na porta ${PORT}`); })