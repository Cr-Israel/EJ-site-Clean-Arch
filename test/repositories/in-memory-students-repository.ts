import { Student } from "@/domain/student/enterprise/entities/student";
import { StudentsRepository } from "@/domain/student/application/repositories/students-repository";

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []

  async findMany(): Promise<Student[]> {
    const student = this.items

    return student
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.items.find((item) => item.email === email)
    if (!student) {
      return null
    }

    return student
  }
  async create(student: Student): Promise<void> {
    this.items.push(student)
  }
}