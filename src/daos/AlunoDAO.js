import Alunos from '../models/Alunos.js'; // Caminho relativo corrigido
import Matricula from '../models/Matriculas.js';

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

    static async buscarPorId(id) {
        try {
            return await Alunos.findById(id);
        } catch (error) {
            throw new Error('Erro ao buscar aluno por ID: ' + error.message);
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
    static async listarPorCurso(idCurso) {
        try {
            const matriculas = await Matricula.find({ curso: idCurso }).populate('aluno');
            return matriculas.map(m => m.aluno);
        } catch (error) {
            throw new Error('Erro ao listar alunos por curso: ' + error.message);
        }
    }
    
    static async mediaIdade() {
        try {
            const result = await Alunos.aggregate([
                { $group: { _id: null, media: { $avg: "$idade" } } }
            ]);
            return result[0]?.media || 0;
        } catch (error) {
            throw new Error('Erro ao calcular média de idade: ' + error.message);
        }
    }
}

export default AlunoDAO;