import { getPrismaClient } from "../prisma-config";

import { Student } from "@/domain/student/enterprise/entities/student";

import { StudentsRepository } from "@/domain/student/application/repositories/students-repository";

import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";

const prisma = getPrismaClient()

export class PrismaStudentsRepository implements StudentsRepository {
  async findByEmail(email: string): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: {
        email
      }
    })
    
    if (!student) {
      return null
    }
    
    return PrismaStudentMapper.toDomain(student)
  }

  async findMany(): Promise<Student[]> {
    const students = await prisma.student.findMany()

    return students.map(PrismaStudentMapper.toDomain)
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await prisma.student.create({
      data
    })
  }
}