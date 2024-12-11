import { RegisterStudentUseCase } from "../register-students";
import { PrismaStudentsRepository } from "@/infra/database/prisma/prisma-students-repository";

export function makeRegisterStudentUseCase() {
  return new RegisterStudentUseCase(new PrismaStudentsRepository())
}