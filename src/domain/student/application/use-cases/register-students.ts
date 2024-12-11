import { Either, left, right } from "@/core/either"

import { Student } from "../../enterprise/entities/student"
import { StudentsRepository } from "../repositories/students-repository"

import { StudentAlreadyExistsError } from "./errors/student-already-exists-error"

export interface RegisterStudentUseCaseRequest {
  name: string
  lastname: string
  course: string
  github: string
  email: string
  hardskills: string[]
  softskills: string[]
  projects: string[]
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository
  ) { }

  async execute({
    name,
    lastname,
    course,
    github,
    email,
    hardskills,
    softskills,
    projects,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentWithSameEmail = await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const student = Student.create({
      name,
      lastname,
      course,
      github,
      email,
      hardskills,
      softskills,
      projects,
    })

    await this.studentsRepository.create(student)

    return right({
      student
    })

  }
}