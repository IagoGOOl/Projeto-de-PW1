import { Router } from 'express';
import { UserController } from '../Controllers/controllerUser';
import { PostController } from '../Controllers/controllerPost';
import { CommentController } from '../Controllers/controllerComment';

const router = Router();

const userController = new UserController();

const postController = new PostController();

const commentController = new CommentController();

router.post('/user', userController.create);

// Rotas da Postagem
router.post('/post', postController.create);
router.get('/post', postController.readAll);

// Rotas dos Comentários da Postagem
router.post('/post/:postId/comment', commentController.create);
router.get('/post/:postId/comment', commentController.readAll);
router.get('/post/:postId/comment/:id', commentController.read);
router.put('/post/:postId/comment/:id', commentController.update);
router.delete('/post/:postId/comment/:id', commentController.delete);

export default router;
