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
            const posts = await prismaService.post.findMany();
			res.status(200).json(posts);
        }
		catch {
			res.status(404).json({ message: 'Postagens não encontradas'});
		}
    }
}
