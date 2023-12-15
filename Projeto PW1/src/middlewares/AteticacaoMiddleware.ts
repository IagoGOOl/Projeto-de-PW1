import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { tonkenPayload } from './auteticar';

export function AuthMiddliwares(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: 'token not provided' });
	}

	const [, token] = authorization.split('');
	try {
		const decoded = verify(token, 'secret');
		const { id } = decoded as tonkenPayload;
		req.userID = id;
		next();
	} catch (error) {
		return res.status(401).json({ error: 'Token Invalid' });
	}
}
