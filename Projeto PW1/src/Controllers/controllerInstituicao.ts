import { Request, Response } from "express";
import { prismaService } from "../Service/prismaService";
import { PrismaClient, Prisma } from "@prisma/client";
import { strict } from "assert";

const prisma = new PrismaClient();
export class InstituicaoController {
  async create(req: Request, res: Response) {
    const { name, latitude, longitude } = req.body;
    try {
      await prismaService.instituicao.create({
        data: {
          name,
          latitude,
          longitude,
        },
      });
      res.status(201).json({ message: "Instituição criada com sucesso" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao criar a instituição" });
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const instituicao = await prismaService.instituicao.findMany();
      res.status(200).json(instituicao);
    } catch {
      res.status(404).json({ message: "Istituições não encontradas" });
    }
  }

  async delete(req: Request, res: Response) {
    const { instituicaoId } = req.params;
    try {
      const instituicao = await prismaService.instituicao.delete({
        where: {
          id: Number(instituicaoId),
        },
      });
      res.status(200).json({ message: "Instituição excluida com sucesso" });
    } catch {
      res.status(404).json({ message: "Istituição não encontrada" });
    }
  }
}
