import { FastifyReply, FastifyRequest } from "fastify";

import { makeFetchStudentsUseCase } from "@/domain/student/application/use-cases/factories/make-fetch-students-use-case";

export class FetchStudentsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const fetchStudentsUseCase = makeFetchStudentsUseCase()

    const result = await fetchStudentsUseCase.execute()

    if (result.value === null) {
        return reply.status(404).send({ message: null })
    }

    const students = result.value.students

    reply.status(200).send({
      result: students
    })
  }
}