import { FastifyInstance } from "fastify";
import { GetStudentController } from "../controllers/GetStudentController";

export async function getStudent(app: FastifyInstance) {
  app.get('/get-student/:studentId', new GetStudentController().execute)
}