import request from "supertest";
import { getPrismaClient } from "@/infra/database/prisma-config";

import { app } from "@/app"

const prisma = getPrismaClient()

describe('Register Student (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /create', async () => {
    const response = await request(app.server)
      .post('/create')
      .send({
        name: "John",
        lastname: "Doe",
        course: "Computer Science",
        github: "John-Doe",
        email: "johndoe@teste.com",
        hardskills: ["Node", "Rust"],
        softskills: ["Smart conversation", "Flexibal"],
        projects: ["Web Site", "Web Scrapping"]
      })

      console.log("Response Status Code:", response.statusCode);
      expect(response.statusCode).toEqual(201)

      const studentOnDatabase = await prisma.student.findUnique({
        where: {
          email: 'johndoe@teste.com'
        }
      })

      console.log("Student on database:", studentOnDatabase);

      expect(studentOnDatabase).toBeTruthy()
  })
})