import 'express-async-errors';
import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.listHomeTeams);
router.get('/away', leaderboardController.listAwayTeams);
router.get('/', leaderboardController.getFullLeaderboard);

export default router;
