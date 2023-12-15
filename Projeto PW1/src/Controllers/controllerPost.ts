import { Request, Response } from 'express';
import { prismaService } from '../Service/prismaService';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
export class PostController {
	async create(req: Request, res: Response) {
		const { title, description, email } = req.body;

        const userExists = await prismaService.user.findFirst({
            where: {
                email
            }
        });

        if (!userExists) {
            return res.status(400).json({ message: 'Email inválido'});
        }

		try {
			await prismaService.post.create({
				data: {
					title,
					description,
					authorId: userExists.id,
				},
			});
			res.status(201).json({ message: 'Sua postagem foi salva com sucesso' });
		} catch (err) {
			res.status(500).json({ message: 'Erro ao criar postagem' });
		}
	}

    async readAll(req: Request, res: Response) {
        try {
            const posts = await prismaService.post.findMany({
				include: {
					comments:true
				}
			});
			res.status(200).json(posts);
        }
		catch {
			res.status(404).json({ message: 'Postagens não encontradas'});
		}
    }

	async readByUser(req: Request, res: Response) {
		const { userId } = req.params;

		const userExists = await prismaService.user.findUnique({
            where: {
                id: Number(userId)
            }
        });

        if (!userExists) {
            return res.status(400).json({ message: 'Id de usuário inválido'});
        }
        try {
            const posts = await prismaService.post.findMany({
				where: {
					authorId: Number(userId)
				},
				include: {
					comments: true
				}
			});
			res.status(200).json(posts);
        }
		catch {
			res.status(404).json({ message: 'Postagens não encontradas'});
		}
    }

	async update(req: Request, res: Response) {
		const { title, description } = req.body;
		const { postId } = req.params;
		
		const post = await prismaService.post.findUnique({
			where: {
				id: Number(postId)
			}
		});

		if (!post) {
			return res.status(404).json({ message: 'Postagem não encontrada' });
		}

		try {
			await prismaService.post.update({
				where: {
					id: Number(postId)
				},
				data: {
					title,
					description
				}
			});
			res.status(200).json({ message: 'Postagem atualizada com sucesso'});
		}
		catch {
			res.status(500).json({ message: 'Não foi possível atualiza a postagem'});
		}
	}

	async delete(req: Request, res: Response) {
		const { postId } = req.params;

		const post = await prismaService.post.findUnique({
			where: {
				id: Number(postId)
			}
		});
		if (!post) {
			return res.status(404).json({ message: 'Postagem não encontrada'});
		}
		
		try {
			await prismaService.post.delete({
				where: {
					id:post.id
				}
			});
			res.status(200).json({ message: 'Postagem deletada com sucesso'});
		}
		catch {
			res.status(500).json({ message: 'Não foi possível deletar a postagem'});
		}
	}
}
