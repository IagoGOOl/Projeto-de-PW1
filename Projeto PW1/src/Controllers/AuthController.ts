import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
export class AuteticaControleer {
  async auteticacao(req: Request, res: Response) {
    const { email, password } = req.body;

    //validar

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ error: "Email inválido" });
    }
    const isValuePassword = await compare(password, user.password);
    if (!isValuePassword) {
      return res.json({ error: "senha invalida" });
    }
    const token = sign({ id: user.id }, "chaveSecreta", {
      expiresIn: "1d",
    });

    const { id } = user;
    return res.json({ token });
  }
}
