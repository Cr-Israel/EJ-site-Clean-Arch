import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeGetStudentUseCase } from "@/domain/student/application/use-cases/factories/make-get-student-use-case";
import { StudentNotFoundError } from "@/domain/student/application/use-cases/errors/student-not-found-error";

import { StudentPresenter } from "../presenters/student-presenter";

const getStudentSchema = z.object({
  email: z.string().email(),
})

export class GetStudentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const studentData = getStudentSchema.parse(request.params)

    // if (!studentData.success) {
    //   return reply.status(400).send({
    //     message: 'Validation error',
    //     issues: studentData.error.format(),
    //   });
    // }

    const getStudentUseCase = makeGetStudentUseCase()

    const result = await getStudentUseCase.execute(studentData)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentNotFoundError:
          return reply.status(404).send({ message: error.message })
        default:
          return reply.status(500).send({ message: 'Unexpected error occurred' })
      }
    }

    const student = result.value.student

    reply.status(200).send({
      result: student
    })
  }
}