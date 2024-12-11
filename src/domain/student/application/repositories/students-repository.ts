import { Student } from "../../enterprise/entities/student";

export interface StudentsRepository {
  findByEmail(email: string): Promise<Student | null>
  findMany(): Promise<Student[]>
  create(student: Student): Promise<void>
}