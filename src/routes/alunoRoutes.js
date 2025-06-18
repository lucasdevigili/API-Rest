import express from 'express';
import AlunoController from '../controllers/alunoController.js';

const router = express.Router();

router.post('/', AlunoController.criar);
router.get('/', AlunoController.listarTodos);
router.put('/:id', AlunoController.atualizar);
router.delete('/:id', AlunoController.deletar);

export default router;
