import { faker } from '@faker-js/faker'

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import { Student, StudentProps } from "@/domain/student/enterprise/entities/student";

import { getPrismaClient } from '@/infra/database/prisma-config';
import { PrismaStudentMapper } from '@/infra/database/mappers/prisma-student-mapper';

const prismaService = getPrismaClient()

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

export class StudentFactory {
  constructor(private prisma: typeof prismaService) {}
  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.prisma.student.create({
      data: PrismaStudentMapper.toPrisma(student)
    })

    return student
  }
}