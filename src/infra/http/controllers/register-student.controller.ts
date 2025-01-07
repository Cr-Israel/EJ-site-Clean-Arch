import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { registerStudentSchema } from "../routes/create-student";
import { StudentAlreadyExistsError } from "@/domain/student/application/use-cases/errors/student-already-exists-error";
import { makeRegisterStudentUseCase } from "@/domain/student/application/use-cases/factories/make-register-student-use-case";

// export const registerStudentSchema = z.object({
//   name: z.string(),
//   lastname: z.string(),
//   course: z.string(),
//   github: z.string(),
//   email: z.string().email(),
//   hardskills: z.array(z.string()),
//   softskills: z.array(z.string()),
//   projects: z.array(z.string())
// })

export class RegisterStudentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const studentData = registerStudentSchema.parse(request.body)

    const registerStudentUseCase = makeRegisterStudentUseCase()

    const result = await registerStudentUseCase.execute(studentData)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          return reply.status(409).send({ message: error.message })
        default:
          return reply.status(500).send({ message: 'Unexpected error occurred' })
      }
    }

    reply.status(201).send()
  }
}