import { Router } from "express";
import { UserController } from "../Controllers/controllerUse";
import { PostController } from "../Controllers/controllerPost";
import { InstituicaoController } from "../Controllers/controllerInstituicao";

const router = Router();

const userController = new UserController();

const postController = new PostController();

const instituicaoController = new InstituicaoController();

router.post("/user", userController.create);

// Rotas da Postagem
router.post("/post", postController.create);
router.get("/post", postController.readAll);

// Rotas da Instituição
router.post("/instituicao", instituicaoController.create);
router.delete("/instituicao/:instituicaoId", instituicaoController.delete);
router.get("/instituicao", instituicaoController.readAll);

export default router;
