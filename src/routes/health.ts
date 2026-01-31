import type { FastifyInstance } from "fastify";

const healthResponseSchema = {
  type: "object" as const,
  properties: {
    status: { type: "string" as const, enum: ["ok"] },
  },
  required: ["status"],
};

export async function healthRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/health", {
    schema: {
      description: "Health check endpoint",
      response: {
        200: {
          description: "Service is healthy",
          ...healthResponseSchema,
        },
      },
    },
    async handler(_request, reply) {
      return reply.status(200).send({ status: "ok" });
    },
  });
}
