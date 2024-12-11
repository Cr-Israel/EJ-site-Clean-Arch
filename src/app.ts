import fastify from "fastify";
import { ZodError } from "zod";

import { env } from "./infra/env/env";
import { getStudent } from "./infra/http/routes/get-student";
import { getAllStudent } from "./infra/http/routes/get-all-student";
import { createStudent } from "./infra/http/routes/create-student";

export const app = fastify();

app.register(getStudent)
app.register(getAllStudent)
app.register(createStudent)

app.setErrorHandler((error, _, reply) => {
  if(error instanceof ZodError) {
    return reply
      .status(400)
      .send({message: 'Validation error', issues: error.format()})
  }

  if(env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({message: 'Internal server error'}) 
})