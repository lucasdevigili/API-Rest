import AlunoDAO from '../daos/AlunoDAO.js';

class AlunoController {
    static async criar(req, res) {
        try {
            const { nome, idade } = req.body;
            if (!nome || !idade) {
                return res.status(400).json({ erro: 'Nome e idade são obrigatórios.' });
            }

            const novoAluno = await AlunoDAO.criar(req.body);
            res.status(201).json(novoAluno);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }

    static async listarTodos(req, res) {
        try {
            const alunos = await AlunoDAO.listarTodos();
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ erro: 'ID é obrigatório.' });

            const aluno = await AlunoDAO.buscarPorId(id);
            if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado.' });

            res.json(aluno);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ erro: 'ID é obrigatório.' });

            const alunoAtualizado = await AlunoDAO.atualizar(id, req.body);
            if (!alunoAtualizado) return res.status(404).json({ erro: 'Aluno não encontrado.' });

            res.json(alunoAtualizado);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ erro: 'ID é obrigatório.' });

            const aluno = await AlunoDAO.deletar(id);
            if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado.' });

            res.json({ mensagem: 'Aluno deletado com sucesso.' });
        } catch (error) {
            if (error.code === 11000 || error.name === 'MongoError') {
                return res.status(409).json({ erro: 'Erro de integridade: aluno vinculado a outras entidades.' });
            }
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }
    static async listarPorCurso(req, res) {
        try {
            const { idCurso } = req.params;
            if (!idCurso) return res.status(400).json({ erro: 'ID do curso é obrigatório.' });
            
            const alunos = await AlunoDAO.listarPorCurso(idCurso);
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
    
    static async mediaIdade(req, res) {
        try {
            const media = await AlunoDAO.mediaIdade();
            res.json({ media: Math.round(media) });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

export default AlunoController;
