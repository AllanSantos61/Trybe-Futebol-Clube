import 'express-async-errors';
import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import authMiddleware from '../middlewares/authMiddleware';
import MatchService from '../services/MatchService';

const router = Router();

const matchService = new MatchService();

const matchController = new MatchController(matchService);

router.get('/', matchController.listAll);
router.post('/', authMiddleware, matchController.create);
router.patch('/:id/finish', matchController.finish);
router.patch('/:id', matchController.update);

export default router;
