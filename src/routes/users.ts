import type { FastifyInstance } from "fastify";

const userParamsSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const, description: "User identifier" },
  },
  required: ["id"],
};

const userResponseSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const },
    name: { type: "string" as const },
  },
  required: ["id", "name"],
};

const errorResponseSchema = {
  type: "object" as const,
  properties: {
    error: { type: "string" as const },
  },
  required: ["error"],
};

export async function usersRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/:id", {
    schema: {
      description: "Get a user by ID",
      params: userParamsSchema,
      response: {
        200: {
          description: "User found",
          ...userResponseSchema,
        },
        404: {
          description: "User not found",
          ...errorResponseSchema,
        },
      },
    },
    async handler(request, reply) {
      const { id } = request.params as { id: string };
      return reply.status(200).send({
        id,
        name: "Example",
      });
    },
  });
}
