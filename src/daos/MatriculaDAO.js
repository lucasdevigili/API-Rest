import Matricula from '../models/Matriculas.js';

class MatriculaDAO {
    static async criar(matriculaData) {
        try {
            return await Matricula.create(matriculaData);
        } catch (error) {
            throw new Error('Erro ao criar matrícula: ' + error.message);
        }
    }

    static async listarTodas() {
        try {
            return await Matricula.find().populate('aluno').populate('curso');
        } catch (error) {
            throw new Error('Erro ao listar matrículas: ' + error.message);
        }
    }

    static async deletar(id) {
        try {
            return await Matricula.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Erro ao deletar matrícula: ' + error.message);
        }
    }
}

export default MatriculaDAO;
