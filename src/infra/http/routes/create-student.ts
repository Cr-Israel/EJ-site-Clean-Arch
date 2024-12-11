import { FastifyInstance } from "fastify";
import { RegisterStudentController } from "../controllers/register-student.controller";

export async function createStudent(app: FastifyInstance) {
  app.post('/create', new RegisterStudentController().handle)
}