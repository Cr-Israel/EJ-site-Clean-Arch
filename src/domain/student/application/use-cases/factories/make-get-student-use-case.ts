import { GetStudentUseCase } from "../get-student";
import { PrismaStudentsRepository } from "@/infra/database/prisma/prisma-students-repository";

export function makeGetStudentUseCase() {
  return new GetStudentUseCase(new PrismaStudentsRepository())
}