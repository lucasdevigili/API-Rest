import CursoDAO from '../daos/CursoDAO.js';

class CursoController {
    static async criar(req, res) {
        try {
            const novoCurso = await CursoDAO.criar(req.body);
            res.status(201).json(novoCurso);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async listarTodos(req, res) {
        try {
            const cursos = await CursoDAO.listarTodos();
            res.json(cursos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const curso = await CursoDAO.atualizar(req.params.id, req.body);
            if (!curso) return res.status(404).json({ erro: 'Curso não encontrado' });
            res.json(curso);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const curso = await CursoDAO.deletar(req.params.id);
            if (!curso) return res.status(404).json({ erro: 'Curso não encontrado' });
            res.json({ mensagem: 'Curso deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

export default CursoController;
