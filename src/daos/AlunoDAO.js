import Alunos from '../models/Alunos.js'; // Caminho relativo corrigido

class AlunoDAO {
    static async criar(alunoData) {
        try {
            return await Alunos.create(alunoData);
        } catch (error) {
            throw new Error('Erro ao criar aluno: ' + error.message);
        }
    }

    static async listarTodos() {
        try {
            return await Alunos.find();
        } catch (error) {
            throw new Error('Erro ao listar alunos: ' + error.message);
        }
    }

    static async atualizar(id, dadosAtualizados) {
        try {
            return await Alunos.findByIdAndUpdate(id, dadosAtualizados, { new: true });
        } catch (error) {
            throw new Error('Erro ao atualizar aluno: ' + error.message);
        }
    }

    static async deletar(id) {
        try {
            return await Alunos.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Erro ao deletar aluno: ' + error.message);
        }
    }
}

export default AlunoDAO;