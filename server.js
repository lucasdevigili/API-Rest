import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AlunoDAO from './src/daos/AlunoDAO.js'; // Caminho corrigido

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao banco de dados');
    } catch (error) {
        console.log('Erro na conexão com o banco de dados', error);
    }
}

connectDB();

// Rotas usando DAO
app.post("/alunos", async (req, res) => {
    try {
        const novoAluno = await AlunoDAO.criar(req.body);
        res.status(201).json(novoAluno);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

app.get('/alunos', async (req, res) => {
    try {
        const alunos = await AlunoDAO.listarTodos();
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.put('/alunos/:id', async (req, res) => {
    try {
        const alunoAtualizado = await AlunoDAO.atualizar(req.params.id, req.body);
        if (!alunoAtualizado) {
            return res.status(404).json({ erro: 'Aluno não encontrado' });
        }
        res.json(alunoAtualizado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

app.delete('/alunos/:id', async (req, res) => {
    try {
        const alunoDeletado = await AlunoDAO.deletar(req.params.id);
        if (!alunoDeletado) {
            return res.status(404).json({ erro: 'Aluno não encontrado' });
        }
        res.json({ mensagem: 'Aluno deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});