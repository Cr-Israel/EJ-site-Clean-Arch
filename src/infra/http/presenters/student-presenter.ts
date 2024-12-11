import { Student } from "@prisma/client";

export class StudentPresenter {
  static toHTTP(student: Student) {
    return {
      id: student.id,
      name: student.name,
      lastname: student.lastname,
      course: student.course,
      github: student.github,
      email: student.email,
      hardskills: student.hardskills,
      softskills: student.softskills,
      projects: student.projects
    }
  }
}