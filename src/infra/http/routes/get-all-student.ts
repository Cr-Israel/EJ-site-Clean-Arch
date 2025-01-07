import { z } from "zod";
import { FastifyTypedInstance } from "@/types/fastify-typed-instance";
import { FetchStudentsController } from "../controllers/fetch-students.controller";

export async function getAllStudent(app: FastifyTypedInstance) {
  app.get('/students', {
    schema: {
      tags: ['students'],
      description: 'Get all Users',
      // response: {
      //   200: z.object({
      //     result: z.array(z.object({
      //       name: z.string(),
      //       lastname: z.string(),
      //       course: z.string(),
      //       github: z.string(),
      //       email: z.string(),
      //       hardskills: z.array(z.string()),
      //       softskills: z.array(z.string()),
      //       projects: z.array(z.string())
      //     }))
      //   })
      // }
    }
  } ,new FetchStudentsController().handle)
}