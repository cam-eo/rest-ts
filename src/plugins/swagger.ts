import type { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export async function swaggerPlugin(fastify: FastifyInstance): Promise<void> {
  await fastify.register(fastifySwagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "REST API",
        description: "Minimal REST API with Fastify",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
      ],
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
    },
  });
}
