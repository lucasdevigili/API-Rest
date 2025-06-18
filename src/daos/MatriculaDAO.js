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
    
    static async buscarPorId(id) {
        try {
            return await Matricula.findById(id).populate('aluno').populate('curso');
        } catch (error) {
            throw new Error('Erro ao buscar matrícula por ID: ' + error.message);
        }
    }   
    static async listarRecentes(dias) {
        try {
            const dataLimite = new Date();
            dataLimite.setDate(dataLimite.getDate() - dias);
            
            return await Matricula.find({ 
                dataMatricula: { $gte: dataLimite } 
            }).populate('aluno').populate('curso');
        } catch (error) {
            throw new Error('Erro ao listar matrículas recentes: ' + error.message);
        }
    }
    
    static async verificarMatricula(idAluno, idCurso) {
        try {
            return await Matricula.findOne({ 
                aluno: idAluno, 
                curso: idCurso 
            });
        } catch (error) {
            throw new Error('Erro ao verificar matrícula: ' + error.message);
        }
    } 
}

export default MatriculaDAO;
