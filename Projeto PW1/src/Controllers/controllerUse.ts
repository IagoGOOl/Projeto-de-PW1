import { Request, Response } from 'express';
import { prismaService } from '../Service/prismaService';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
export class UserController {
	async create(req: Request, res: Response) {
		const { nome, email, password } = req.body;

		try {
			await prismaService.user.create({
				data: {
					nome,
					email,
					password,
				},
			});
			res.status(201).json({ message: 'Usuario Criado com sucesso' });
		} catch (err) {
			res.status(500).json({ message: 'Erro ao criar o Usuario' });
		}
	}
}
