import AlunoDAO from '../daos/AlunoDAO.js';

class AlunoController {
    static async criar(req, res) {
        try {
            const novoAluno = await AlunoDAO.criar(req.body);
            res.status(201).json(novoAluno);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async listarTodos(req, res) {
        try {
            const alunos = await AlunoDAO.listarTodos();
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const aluno = await AlunoDAO.atualizar(req.params.id, req.body);
            if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
            res.json(aluno);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const aluno = await AlunoDAO.deletar(req.params.id);
            if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
            res.json({ mensagem: 'Aluno deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

export default AlunoController;
