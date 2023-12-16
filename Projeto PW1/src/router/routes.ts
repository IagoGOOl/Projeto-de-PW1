import { Router } from 'express';
import { UserController } from '../Controllers/controllerUser';
import { PostController } from '../Controllers/controllerPost';
import { InstituicaoController } from '../Controllers/controllerInstituicao';
import { CommentController } from '../Controllers/controllerComment';
import { AuthMiddliwares } from '../middlewares/AteticacaoMiddleware';

const router = Router();

const userController = new UserController();

const postController = new PostController();

const instituicaoController = new InstituicaoController();
const commentController = new CommentController();

// Rotas de Usuários
router.post('/user', userController.create);
router.post('/login', AuthMiddliwares);
router.get('/user', userController.read);
router.patch('/user', userController.update);
router.delete('/user', userController.delete);

// Rotas da Postagem
router.post('/post', postController.create);
router.get('/post', postController.readAll);
router.get('/post/:userId', postController.readByUser);
router.patch('/post/:postId', postController.update);
router.delete('/post/:postId', postController.delete);

// Rotas da Instituição
router.post('/instituicao', instituicaoController.create);
router.delete('/instituicao/:instituicaoId', instituicaoController.delete);
router.patch('/Instituicao/:instituicaoId', instituicaoController.update);
router.get('/instituicao', instituicaoController.readAll);

// Rotas dos Comentários da Postagem
router.post('/post/:postId/comment', commentController.create);
router.get('/post/:postId/comment', commentController.readAll);
router.get('/post/:postId/comment/:id', commentController.read);
router.patch('/post/:postId/comment/:id', commentController.update);
router.delete('/post/:postId/comment/:id', commentController.delete);

export default router;
