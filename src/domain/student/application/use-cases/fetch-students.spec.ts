import { FetchStudentsUseCase } from "./fetch-students"
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository"

import { makeStudent } from "test/factories/make-student"

let inMemoryStudentsRepository: InMemoryStudentsRepository

let sut: FetchStudentsUseCase

describe('Get Student Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    sut = new FetchStudentsUseCase(inMemoryStudentsRepository)
  })

  it('should be get a student', async () => {
    const newStudent1 = makeStudent()
    const newStudent2 = makeStudent()
    const newStudent3 = makeStudent()

    await inMemoryStudentsRepository.items.push(newStudent1)
    await inMemoryStudentsRepository.items.push(newStudent2)
    await inMemoryStudentsRepository.items.push(newStudent3)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)

    expect(result.value).toEqual(expect.objectContaining({
      students: expect.arrayContaining([
        expect.objectContaining({
          id: newStudent1.id,
          email: newStudent1.email
        }),
        expect.objectContaining({
          id: newStudent2.id,
          email: newStudent2.email
        }),
        expect.objectContaining({
          id: newStudent3.id,
          email: newStudent3.email
        })
      ])
    }))
  })
})