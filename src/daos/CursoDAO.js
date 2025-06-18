import Curso from '../models/Cursos.js';
import Matricula from '../models/Matriculas.js';

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
    
    static async buscarPorId(id) {
        try {
            return await Curso.findById(id);
        } catch (error) {
            throw new Error('Erro ao buscar curso por ID: ' + error.message);
        }
    }
    static async listarPopulares(minMatriculas) {
        try {
            return await Curso.aggregate([
                {
                    $lookup: {
                        from: "matriculas",
                        localField: "_id",
                        foreignField: "curso",
                        as: "matriculas"
                    }
                },
                {
                    $match: {
                        "matriculas.5": { $exists: true } // +5 matrículas
                    }
                }
            ]);
        } catch (error) {
            throw new Error('Erro ao listar cursos populares: ' + error.message);
        }
    }
    
    static async contarAlunosPorCurso() {
        try {
            return await Matricula.aggregate([
                { $group: { _id: "$curso", total: { $sum: 1 } } },
                { $lookup: {
                    from: "cursos",
                    localField: "_id",
                    foreignField: "_id",
                    as: "curso"
                }},
                { $unwind: "$curso" },
                { $project: { 
                    "curso.nome": 1,
                    total: 1 
                }}
            ]);
        } catch (error) {
            throw new Error('Erro ao contar alunos por curso: ' + error.message);
        }
    }
}

export default CursoDAO;
