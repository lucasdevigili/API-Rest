import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import alunoRoutes from './src/routes/alunoRoutes.js';
import cursoRoutes from './src/routes/cursoRoutes.js';
import matriculaRoutes from './src/routes/matriculaRoutes.js';
import authRoutes from './src/routes/authRoutes.js'; // Adicione
import authMiddleware from './src/Middlewares/authMiddleware.js'; // Adicione

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Conexão com o banco
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao banco de dados');
  } catch (error) {
    console.log('Erro na conexão com o banco de dados', error);
  }
};

connectDB();

// Rotas públicas (sem autenticação)
app.use('/auth', authRoutes);

// Middleware de autenticação (protege todas as rotas abaixo)
app.use(authMiddleware);

// Rotas protegidas
app.use('/alunos', alunoRoutes);
app.use('/cursos', cursoRoutes);
app.use('/matriculas', matriculaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});