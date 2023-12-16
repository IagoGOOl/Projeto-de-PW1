import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
export class AuteticaControleer {
	async auteticacao(req: Request, res: Response) {
		const { email, password } = req.body;

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(401).json({ error: 'user or password invalide' });
		}
		const isValuePassword = await compare(password, user.password);
		if (!isValuePassword) {
			return res.status(401).json({ error: 'user or password invalide' });
		}
		const token = sign({ id: user.id }, 'chaveSecreta', {
			expiresIn: '1d',
		});

		const { id } = user;
		return res.json({ user: { id, email }, token });
	}
}
