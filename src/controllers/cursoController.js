import CursoDAO from '../daos/CursoDAO.js';

class CursoController {
    static async criar(req, res) {
        try {
            const { nome } = req.body;
            if (!nome) return res.status(400).json({ erro: 'Nome do curso é obrigatório.' });

            const novoCurso = await CursoDAO.criar(req.body);
            res.status(201).json(novoCurso);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }

    static async listarTodos(req, res) {
        try {
            const cursos = await CursoDAO.listarTodos();
            res.json(cursos);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ erro: 'ID é obrigatório.' });

            const curso = await CursoDAO.buscarPorId(id);
            if (!curso) return res.status(404).json({ erro: 'Curso não encontrado.' });

            res.json(curso);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ erro: 'ID é obrigatório.' });

            const cursoAtualizado = await CursoDAO.atualizar(id, req.body);
            if (!cursoAtualizado) return res.status(404).json({ erro: 'Curso não encontrado.' });

            res.json(cursoAtualizado);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ erro: 'ID é obrigatório.' });

            const curso = await CursoDAO.deletar(id);
            if (!curso) return res.status(404).json({ erro: 'Curso não encontrado.' });

            res.json({ mensagem: 'Curso deletado com sucesso.' });
        } catch (error) {
            if (error.code === 11000 || error.name === 'MongoError') {
                return res.status(409).json({ erro: 'Erro de integridade: curso vinculado a outras entidades.' });
            }
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }
    static async listarPopulares(req, res) {
        try {
            const cursos = await CursoDAO.listarPopulares();
            res.json(cursos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async contarAlunosPorCurso(req, res) {
        try {
            const contagem = await CursoDAO.contarAlunosPorCurso();
            res.json(contagem);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

export default CursoController;
