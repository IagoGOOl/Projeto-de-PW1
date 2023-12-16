import { Request, Response } from 'express';
import { prismaService } from '../service/prismaService';

function response(res: Response, message: string, status: number = 400) {
	return res.status(status).json({ message });
}

export class CommentController {
	async create(req: Request, res: Response) {
		const { postId } = req.params;
		const { description, email } = req.body;

		if (!postId) {
			return response(
				res,
				'O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!',
				404
			);
		}

		if (!description) {
			return response(res, 'Não é possível criar um comentário vazio');
		}

		if (!email) {
			return response(
				res,
				'Cadê sua identificação? Faça login e tente novamente!'
			);
		}

		const userExists = await prismaService.user.findFirst({
			where: {
				email,
			},
		});

		if (!userExists) {
			return response(
				res,
				'Ooops, parece que você não pode comentar nessa postagem. Faça login e tente novamente!'
			);
		}

		try {
			await prismaService.comment.create({
				data: {
					description,
					postId: Number(postId),
					authorId: userExists.id,
				},
			});
			response(res, 'Seu comentário foi salvo com sucesso', 200);
		} catch (err) {
			response(res, 'Erro ao criar comentário', 500);
		}
	}

	async readAll(req: Request, res: Response) {
		const { postId } = req.params;

		if (!postId) {
			return response(
				res,
				'O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!'
			);
		}

		try {
			const comments = await prismaService.comment.findMany({
				where: {
					postId: Number(postId),
				},
			});

			res.status(200).json(comments);
		} catch {
			response(res, 'Comentários não encontrados', 404);
		}
	}

	async read(req: Request, res: Response) {
		const { postId, id } = req.params;

		if (!postId) {
			return response(
				res,
				'O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!'
			);
		}

		if (!id) {
			return response(
				res,
				'O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!'
			);
		}

		try {
			const comment = await prismaService.comment.findFirst({
				where: {
					id: Number(id),
					postId: Number(postId),
				},
			});

			res.status(200).json(comment);
		} catch {
			response(res, 'Comentário não encontrado', 404);
		}
	}

	async update(req: Request, res: Response) {
		const { postId, id } = req.params;
		const { description, email } = req.body;

		if (!postId) {
			return response(
				res,
				'O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!'
			);
		}

		if (!id) {
			return response(
				res,
				'O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!'
			);
		}

		if (!description) {
			return response(
				res,
				'Não é possível atualizar um comentário vazio'
			);
		}

		if (!email) {
			return response(
				res,
				'Cadê sua identificação? Faça login e tente novamente!'
			);
		}

		const userExists = await prismaService.user.findFirst({
			where: {
				email,
			},
		});

		if (!userExists) {
			return response(res, 'Você não pode atualizar esse comentário!');
		}

		try {
			await prismaService.comment.update({
				where: {
					id: Number(id),
					postId: Number(postId),
					authorId: userExists.id,
				},
				data: {
					description,
				},
			});

			res.status(200).json({
				message: 'Comentário atualizado com sucesso',
			});
		} catch {
			response(res, 'Não foi possível atualizar o comentário', 404);
		}
	}

	async delete(req: Request, res: Response) {
		const { postId, id } = req.params;
		const { description, email } = req.body;

		if (!postId) {
			return response(
				res,
				'O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!'
			);
		}

		if (!id) {
			return response(
				res,
				'O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!'
			);
		}

		if (!description) {
			return response(
				res,
				'Não é possível atualizar um comentário vazio'
			);
		}

		if (!email) {
			return response(
				res,
				'Cadê sua identificação? Faça login e tente novamente!'
			);
		}

		const userExists = await prismaService.user.findFirst({
			where: {
				email,
			},
		});

		if (!userExists) {
			return response(res, 'Você não pode atualizar esse comentário!');
		}

		try {
			await prismaService.comment.delete({
				where: {
					id: Number(id),
					postId: Number(postId),
					authorId: userExists.id,
				},
			});

			res.status(200).json({
				message: 'Comentário deletado com sucesso',
			});
		} catch {
			response(res, 'Não foi possível deletar o comentário', 404);
		}
	}
}
