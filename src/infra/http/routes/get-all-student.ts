import { FastifyInstance } from "fastify";
import { FetchStudentsController } from "../controllers/fetch-students.controller";

export async function getAllStudent(app: FastifyInstance) {
  app.get('/students', new FetchStudentsController().handle)
}