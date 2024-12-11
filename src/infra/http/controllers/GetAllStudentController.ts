import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../database/prisma-init";

export class GetAllStudentController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const students = await prisma.student.findMany({
      include: {
        hardskills: {
          select: {
            name: true
          }
        },
        softskills: {
          select: {
            name: true
          }
        },
        projects: {
          select: {
            name: true,
            description: true
          }
        },
      }
    })

    if (!students) {
      return reply.status(404).send({ messsage: 'Estudante não encontrado' });
    }

    reply.status(200).send(students)
  }
}