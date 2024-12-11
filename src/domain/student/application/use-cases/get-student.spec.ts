import { GetStudentUseCase } from "./get-student"
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository"

import { makeStudent } from "test/factories/make-student"

import { StudentNotFoundError } from "./errors/student-not-found-error"
import { Student } from "../../enterprise/entities/student"

let inMemoryStudentsRepository: InMemoryStudentsRepository

let sut: GetStudentUseCase

describe('Get Student Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    sut = new GetStudentUseCase(inMemoryStudentsRepository)
  })

  it('should be get a student', async () => {
    const newStudent = makeStudent({
      email: 'johndoe@test.com'
    })

    await inMemoryStudentsRepository.items.push(newStudent)

    const result = await sut.execute({
      email: newStudent.email,
    })

    expect(result.isRight()).toBe(true)

    expect(result.value).toEqual(expect.objectContaining({
      student: expect.objectContaining({
        id: newStudent.id,
        email: newStudent.email
      })
    }))
    // expect((result.value as { student: Student }).student.email).toEqual(newStudent.email)
    // expect(result.value).toMatchObject({
    //   student: expect.objectContaining({
    //     id: newStudent.id,
    //     email: newStudent.email
    //   })
    // })
  })

  it('should not be able to get a student that not exists', async () => {
    const newStudent = makeStudent({
      email: 'johndoe@test.com'
    })

    await inMemoryStudentsRepository.items.push(newStudent)

    const result = await sut.execute({
      email: 'johndoe2024@test.com',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(StudentNotFoundError)
  })
})