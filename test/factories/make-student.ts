import { faker } from '@faker-js/faker'

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import { Student, StudentProps } from "@/domain/student/enterprise/entities/student";

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID
) {
  const student = Student.create({
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    course: faker.person.jobType(),
    github: faker.internet.username(),
    email: faker.internet.email(),
    hardskills: [faker.lorem.words(10), faker.lorem.words(10)],
    softskills: [faker.lorem.words(10), faker.lorem.words(10)],
    projects: [faker.person.jobTitle(), faker.person.jobTitle()],

    ...override
  },
    id,
  )

  return student
}