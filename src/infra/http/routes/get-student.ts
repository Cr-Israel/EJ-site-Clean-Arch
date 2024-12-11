import { FastifyInstance } from "fastify";
import { GetStudentController } from "../controllers/get-student.controller";

export async function getStudent(app: FastifyInstance) {
  app.get('/students/:email', new GetStudentController().handle)
}