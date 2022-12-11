import 'express-async-errors';
import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.findAllTeams);
router.get('/:id', teamController.findTeamById);

export default router;
