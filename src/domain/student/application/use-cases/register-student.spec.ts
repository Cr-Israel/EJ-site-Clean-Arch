import { RegisterStudentUseCase } from "./register-students"
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository"

import { makeStudent } from "test/factories/make-student"

import { StudentAlreadyExistsError } from "./errors/student-already-exists-error"

let inMemoryStudentsRepository: InMemoryStudentsRepository

let sut: RegisterStudentUseCase

describe('Register Student Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository)
  })

  it('should be able to register student', async () => {
    const result = await sut.execute({
      name: 'John',
      lastname: 'Doe',
      course: 'any_course',
      github: 'any_github',
      email: 'johndoe@test.com',
      hardskills: ['any_hardskill'],
      softskills: ['any_softskill'],
      projects: ['any_project']
    })

    console.log(result.value)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0]
    })
  })

  it('should not be able to register student with same e-mail', async () => {
    const newStudent = makeStudent({
      email: 'johndoe@test.com'
    })

    await inMemoryStudentsRepository.items.push(newStudent)

    const result = await sut.execute({
      name: 'John',
      lastname: 'Doe',
      course: 'any_course',
      github: 'any_github',
      email: 'johndoe@test.com',
      hardskills: ['any_hardskill'],
      softskills: ['any_softskill'],
      projects: ['any_project']
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(StudentAlreadyExistsError)
  })
})