import Curso from '../models/Cursos.js';

class CursoDAO {
    static async criar(cursoData) {
        try {
            return await Curso.create(cursoData);
        } catch (error) {
            throw new Error('Erro ao criar curso: ' + error.message);
        }
    }

    static async listarTodos() {
        try {
            return await Curso.find();
        } catch (error) {
            throw new Error('Erro ao listar cursos: ' + error.message);
        }
    }

    static async atualizar(id, dadosAtualizados) {
        try {
            return await Curso.findByIdAndUpdate(id, dadosAtualizados, { new: true, runValidators: true });
        } catch (error) {
            throw new Error('Erro ao atualizar curso: ' + error.message);
        }
    }

    static async deletar(id) {
        try {
            return await Curso.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Erro ao deletar curso: ' + error.message);
        }
    }
}

export default CursoDAO;
