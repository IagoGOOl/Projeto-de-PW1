import { Request, Response } from 'express';
import { prismaService } from '../Service/prismaService';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
export class UserController {
	async create(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const userExists = await prisma.user.findUnique({ where: { email } });
		if (userExists) {
			return res.json({ error: 'usuario existir' });
		}
		try {
			const user = await prismaService.user.create({
				data: {
					name,
					email,
					password,
				},
			});
			res.status(201).json({ messagem: 'Usuario Criado com Sucesso' });
			return res.json({ user });
		} catch (err) {
			res.status(500).json({ message: 'Erro ao criar o Usuario' });
		}
	}
}
