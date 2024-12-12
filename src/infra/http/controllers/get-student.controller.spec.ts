import request from "supertest";
import { getPrismaClient } from "@/infra/database/prisma-config";

import { app } from "@/app"

import { StudentFactory } from "test/factories/make-student";

const prisma = getPrismaClient()

describe('Get Student (e2e)', () => {
  let studentFactory: StudentFactory

  beforeAll(async () => {
    await app.ready()
    studentFactory = new StudentFactory(prisma)
  })

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close()
  })

  it('[GET] /students/:email', async () => {
    await prisma.student.deleteMany({});

    const student = await studentFactory.makePrismaStudent({
      email: 'johndoe@teste.com'
    })

    const response = await request(app.server)
      .get(`/students/${student.email}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.result.props.email).toEqual(student.email)
  })
})