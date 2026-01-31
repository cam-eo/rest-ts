import Fastify from "fastify";
import cors from "@fastify/cors";
import { swaggerPlugin } from "./plugins/swagger.js";
import { healthRoutes } from "./routes/health.js";
import { usersRoutes } from "./routes/users.js";

const port = parseInt(process.env.PORT ?? "3000", 10);

async function main(): Promise<void> {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, { origin: true });

  await fastify.register(swaggerPlugin);

  await fastify.register(healthRoutes);
  await fastify.register(usersRoutes, { prefix: "/users" });

  fastify.setErrorHandler((err, _request, reply) => {
    fastify.log.error(err);
    void reply.status(500).send({ error: "Something went wrong!" });
  });

  try {
    await fastify.listen({ port, host: "0.0.0.0" });
    fastify.log.info(`Server is running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

void main();
