import { z } from "zod";
import { FastifyTypedInstance } from "@/types/fastify-typed-instance";
import { RegisterStudentController } from "../controllers/register-student.controller";

export const registerStudentSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  course: z.string(),
  github: z.string(),
  email: z.string().email(),
  hardskills: z.array(z.string()),
  softskills: z.array(z.string()),
  projects: z.array(z.string())
})

export async function createStudent(app: FastifyTypedInstance) {
  app.post('/create', {
    schema: {
      tags: ['students'],
      description: 'Create a new User',
      body: registerStudentSchema,
      response: {
        201: z.null().describe('User created')
    }
    }
  }, new RegisterStudentController().handle)
}