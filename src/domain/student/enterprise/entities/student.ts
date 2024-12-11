import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface StudentProps {
  name: string
  lastname: string
  course: string
  github: string
  email: string
  hardskills?: string[]
  softskills?: string[]
  projects?: string[]
}

export class Student extends Entity<StudentProps> {
  get name() {
    return this.props.name
  }

  get lastname() {
    return this.props.lastname
  }

  get course() {
    return this.props.course
  }

  get github() {
    return this.props.github
  }

  get email() {
    return this.props.email
  }

  get hardskills() {
    return this.props.hardskills
  }

  get softskills() {
    return this.props.softskills
  }

  get projects() {
    return this.props.projects
  }

  static create(
    props: StudentProps,
    id?: UniqueEntityID
  ) {
    const student = new Student(props, id)

    return student
  }
}