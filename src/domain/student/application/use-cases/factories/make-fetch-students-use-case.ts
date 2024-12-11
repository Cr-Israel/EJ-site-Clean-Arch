import { FetchStudentsUseCase } from "../fetch-students";
import { PrismaStudentsRepository } from "@/infra/database/prisma/prisma-students-repository";

export function makeFetchStudentsUseCase() {
  return new FetchStudentsUseCase(new PrismaStudentsRepository())
}