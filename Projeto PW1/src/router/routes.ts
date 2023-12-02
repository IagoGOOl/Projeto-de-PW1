import { Router } from 'express';
import { UserController } from '../Controllers/controllerUse';

const router = Router();

const userController = new UserController();

router.post('/user', userController.create);

export default router;
