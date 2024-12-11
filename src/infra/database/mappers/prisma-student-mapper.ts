import {Student as PrismaStudent, Prisma} from '@prisma/client'
import { Student } from "@/domain/student/enterprise/entities/student";
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaStudentMapper {
  static toDomain(raw: PrismaStudent): Student {
    return Student.create({
      name: raw.name,
      lastname: raw.lastname,
      course: raw.course,
      github: raw.github,
      email: raw.email,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(student: Student): Prisma.StudentUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      lastname: student.lastname,
      course: student.course,
      github: student.github,
      email: student.email,
    }
  }
}