import request from "supertest";
import { getPrismaClient } from "@/infra/database/prisma-config";

import { app } from "@/app"

import { StudentFactory } from "test/factories/make-student";

const prisma = getPrismaClient()

describe('Fetch Students (e2e)', () => {
  let studentFactory: StudentFactory

  beforeAll(async () => {
    await app.ready()
    studentFactory = new StudentFactory(prisma)
  })

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close()
  })

  it('[GET] /students', async () => {
    await prisma.student.deleteMany({});

    await Promise.all([
      studentFactory.makePrismaStudent({
        email: 'johndoe1@teste.com'
      }),
      studentFactory.makePrismaStudent({
        email: 'johndoe2@teste.com'
      }),
      studentFactory.makePrismaStudent({
        email: 'johndoe3@teste.com'
      }),
    ])

    const response = await request(app.server)
      .get('/students')
      .send()

    console.log(response.body.result)

    expect(response.statusCode).toEqual(200)
    expect(response.body.result.length).toEqual(3)
  })
})