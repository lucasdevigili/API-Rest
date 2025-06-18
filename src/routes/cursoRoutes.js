import express from 'express';
import CursoController from '../controllers/cursoController.js';

const router = express.Router();

router.post('/', CursoController.criar);
router.get('/', CursoController.listarTodos);
router.get('/populares', CursoController.listarPopulares);
router.get('/alunos-por-curso', CursoController.contarAlunosPorCurso);
router.get('/:id', CursoController.buscarPorId);
router.put('/:id', CursoController.atualizar);
router.delete('/:id', CursoController.deletar);


export default router;
