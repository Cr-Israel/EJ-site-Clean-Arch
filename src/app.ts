import { ZodError } from "zod";
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";

import { env } from "./infra/env/env";
import { getStudent } from "./infra/http/routes/get-student";
import { getAllStudent } from "./infra/http/routes/get-all-student";
import { createStudent } from "./infra/http/routes/create-student";

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' });

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Typed API',
      version: '1.0.0',
    }
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(getStudent)
app.register(getAllStudent)
app.register(createStudent)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})