import MatriculaDAO from '../daos/MatriculaDAO.js';

class MatriculaController {
    static async criar(req, res) {
        try {
            const { aluno, curso } = req.body;
            if (!aluno || !curso) {
                return res.status(400).json({ erro: 'Campos aluno e curso são obrigatórios.' });
            }

            const novaMatricula = await MatriculaDAO.criar(req.body);
            res.status(201).json(novaMatricula);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }

    static async listarTodas(req, res) {
        try {
            const matriculas = await MatriculaDAO.listarTodas();
            res.json(matriculas);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ erro: 'ID é obrigatório.' });

            const matricula = await MatriculaDAO.buscarPorId(id);
            if (!matricula) return res.status(404).json({ erro: 'Matrícula não encontrada.' });

            res.json(matricula);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ erro: 'ID é obrigatório.' });

            const matricula = await MatriculaDAO.deletar(id);
            if (!matricula) return res.status(404).json({ erro: 'Matrícula não encontrada.' });

            res.json({ mensagem: 'Matrícula deletada com sucesso.' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao acessar o banco de dados: ' + error.message });
        }
    }
    static async listarRecentes(req, res) {
        try {
            const { dias = 7 } = req.query; // Default: últimos 7 dias
            const matriculas = await MatriculaDAO.listarRecentes(parseInt(dias));
            res.json(matriculas);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
    
    static async verificarMatricula(req, res) {
        try {
            const { idAluno, idCurso } = req.query;
            if (!idAluno || !idCurso) {
                return res.status(400).json({ erro: 'IDs de aluno e curso são obrigatórios.' });
            }
            
            const matricula = await MatriculaDAO.verificarMatricula(idAluno, idCurso);
            res.json({ existe: !!matricula });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

export default MatriculaController;
