import { Request, Response } from 'express';
import { prismaService } from '../Service/prismaService';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
export class UserController {
	async read(req: Request, res: Response) {
		const id = req.userID;

		try {
			const user = await prismaService.user.findUnique({
				where: { id },
			});
			res.status(201).json({ user });
		} catch (err) {
			res.status(500).json({ message: 'Erro ao procurar por Usuário' });
		}
	}

	async create(req: Request, res: Response) {
		const { name, email, password } = req.body;

		try {
			await prismaService.user.create({
				data: {
					name,
					email,
					password,
				},
			});
			res.status(201).json({ message: 'Usuário Criado com sucesso' });
		} catch (err) {
			res.status(500).json({ message: 'Erro ao criar o Usuário' });
		}
	}
	async update(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const id = req.userID;

		try {
			await prismaService.user.update({
				where: { id },
				data: {
					name,
					email,
					password,
				},
			});
			res.status(201).json({ message: 'Usuário Criado com sucesso' });
		} catch (err) {
			res.status(500).json({
				message: 'Erro ao atualizar dados de Usuário',
			});
		}
	}

	async delete(req: Request, res: Response) {
		const id = req.userID;

		try {
			await prismaService.user.delete({
				where: { id },
			});
			res.status(201).json({ message: 'Usuário excluido com sucesso' });
		} catch (err) {
			res.status(500).json({ message: 'Erro ao excluir Usuário' });
		}
	}
}
