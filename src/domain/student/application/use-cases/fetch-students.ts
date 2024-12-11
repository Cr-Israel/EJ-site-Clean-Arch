import { Either, right } from "@/core/either"

import { Student } from "../../enterprise/entities/student"
import { StudentsRepository } from "../repositories/students-repository"

type FetchStudentsUseCaseResponse = Either<
  null,
  {
    students: Student[]
  }
>

export class FetchStudentsUseCase {
  constructor(
    private studentsRepository: StudentsRepository
  ) { }

  async execute(): Promise<FetchStudentsUseCaseResponse> {
    const students = await this.studentsRepository.findMany()

    return right({
      students
    })

  }
}