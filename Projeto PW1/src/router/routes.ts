import { Router } from 'express';
import { UserController } from '../Controllers/controllerUse';
import { PostController } from '../Controllers/controllerPost';

const router = Router();

const userController = new UserController();

const postController = new PostController();


router.post('/user', userController.create);

// Rotas da Postagem
router.post('/post', postController.create);
router.get('/post', postController.readAll);

export default router;
