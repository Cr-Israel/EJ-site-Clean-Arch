import { Either, left, right } from "@/core/either"

import { Student } from "../../enterprise/entities/student"
import { StudentsRepository } from "../repositories/students-repository"

import { isValidEmail } from "./lib/valid-email"

import { InvalidEmailError } from "./errors/invalid-email-error"
import { StudentNotFoundError } from "./errors/student-not-found-error"

export interface GetStudentUseCaseRequest {
  email: string
}

type GetStudentUseCaseResponse = Either<
  StudentNotFoundError | InvalidEmailError,
  {
    student: Student
  }
>

export class GetStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository
  ) { }

  async execute({
    email,
  }: GetStudentUseCaseRequest): Promise<GetStudentUseCaseResponse> {
    const emailValid = isValidEmail(email)

    if (!emailValid) {
      return left(new InvalidEmailError(email))
    }

    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new StudentNotFoundError())
    }

    return right({
      student
    })

  }
}