import express from 'express';
import MatriculaController from '../controllers/matriculaController.js';

const router = express.Router();

router.post('/', MatriculaController.criar);
router.get('/', MatriculaController.listarTodas);
router.delete('/:id', MatriculaController.deletar);

export default router;
