import 'express-async-errors';
import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

const router = Router();

const userService = new UserService();

const userController = new UserController(userService);

router.get('/validate', authMiddleware, userController.getRole);
router.post('/', userController.login);

export default router;
