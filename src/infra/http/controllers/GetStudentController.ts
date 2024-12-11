import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../database/prisma-config";
import { z } from "zod";

export class GetStudentController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const getStudentParams = z.object({
      studentId: z.string()
    })

    const { studentId } = getStudentParams.parse(request.params)

    const student = await prisma.student.findUnique({
      where: {
        id: studentId
      },
      include: {
        hardskills: {
          select: {
            name: true,
          }
        },
        softskills: {
          select: {
            name: true,
          }
        },
        projects: {
          select: {
            name: true,
            description: true
          }
        }
      }
    })

    if (!student) {
      return reply.status(404).send({ messsage: 'Estudante não encontrado' });
    }

    reply.send({
      student: {
        id: student.id,
        name: student.name,
        lastname: student.lastname,
        course: student.course,
        github: student.github,
        email: student.email,
        hardskills: student.hardskills.map(hardskill => {
          return {
            name: hardskill.name
          }
        }),
        softskills: student.softskills.map(softskill => {
          return {
            name: softskill.name,
          }
        }),
        projects: student.projects.map(project => {
          return {
            name: project.name,
            description: project.description
          }
        })
      }
    })
  }
}