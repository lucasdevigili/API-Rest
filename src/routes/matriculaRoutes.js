import express from 'express';
import MatriculaController from '../controllers/matriculaController.js';

const router = express.Router();

router.post('/', MatriculaController.criar);
router.get('/', MatriculaController.listarTodas);
router.get('/recentes', MatriculaController.listarRecentes);
router.get('/verificar', MatriculaController.verificarMatricula);
router.get('/:id', MatriculaController.buscarPorId);
router.delete('/:id', MatriculaController.deletar);


export default router;
