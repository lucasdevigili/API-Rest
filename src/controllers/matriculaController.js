import MatriculaDAO from '../daos/MatriculaDAO.js';

class MatriculaController {
    static async criar(req, res) {
        try {
            const novaMatricula = await MatriculaDAO.criar(req.body);
            res.status(201).json(novaMatricula);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async listarTodas(req, res) {
        try {
            const matriculas = await MatriculaDAO.listarTodas();
            res.json(matriculas);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const matricula = await MatriculaDAO.deletar(req.params.id);
            if (!matricula) return res.status(404).json({ erro: 'Matrícula não encontrada' });
            res.json({ mensagem: 'Matrícula deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

export default MatriculaController;
